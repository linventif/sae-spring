package fr.but3.sae.appUser;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.security.Principal;
import java.util.Collections;
import java.util.Objects;

@RestController
@RequestMapping("/api/users")
public class AppUserController {

    @Autowired
    private JavaMailSender sender;

    @Autowired
    private AppUserRepository appUserRepository;

    @PostMapping("test-mail")
    public ResponseEntity<?> postTestMail(Principal principal) throws MessagingException {
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("gregoire.launaybecue.etu@univ-lille.fr");
        helper.setTo("gregoire.becue@proton.me");
        helper.setSubject("Hi");
        helper.setText("How are you?");
        sender.send(message);

        return ResponseEntity.ok(Collections.singletonMap("message", "Mail sent"));
    }


    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Principal principal) {
        String email = principal.getName();
        AppUser user = appUserRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return ResponseEntity.ok(user);
    }

    private final String publicProfilePath = "public-profiles-picture/";

    @PostMapping("/profile-picture")
    public ResponseEntity<?> postUploadProfilePicture(Principal principal, @RequestParam("file") MultipartFile file) {
        String email = principal.getName();
        AppUser user = appUserRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Veuillez sélectionner un fichier.");
        }

        try {
            File directory = new File(publicProfilePath);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            String fileName = java.util.UUID.randomUUID().toString() + Objects.requireNonNull(file.getOriginalFilename()).substring(file.getOriginalFilename().lastIndexOf('.'));
            Path path = Path.of(publicProfilePath + fileName);
            file.transferTo(path);

            user.setProfilePicture(fileName);
            appUserRepository.save(user);

            return ResponseEntity.ok(Collections.singletonMap("fileName", fileName));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Erreur lors de la sauvegarde du fichier.");
        }
    }

    @DeleteMapping("/profile-picture")
    public ResponseEntity<?> deleteProfilePicture(Principal principal) {
        String email = principal.getName();
        AppUser user = appUserRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        if (user.getProfilePicture() == null) {
            return ResponseEntity.badRequest().body("Aucune image de profil à supprimer.");
        }

        Path path = Path.of(publicProfilePath + user.getProfilePicture());
        File file = path.toFile();
        if (file.delete()) {
            user.setProfilePicture(null);
            return ResponseEntity.ok(Collections.singletonMap("message", "Image de profil supprimée avec succès."));
        } else {
            return ResponseEntity.status(500).body("Erreur lors de la suppression de l'image de profil.");
        }
    }

    @GetMapping("/profile-picture/{uuid}")
    public ResponseEntity<?> getProfilePicture(@PathVariable String uuid) {
        Path filePath = Path.of("public-profiles-picture", uuid);

        try {
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            // Determine content type (image/jpeg, image/png, etc.)
            String contentType = MediaType.IMAGE_JPEG_VALUE; // Default to JPEG
            if (uuid.endsWith(".png")) {
                contentType = MediaType.IMAGE_PNG_VALUE;
            } else if (uuid.endsWith(".gif")) {
                contentType = MediaType.IMAGE_GIF_VALUE;
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erreur lors de la récupération de l'image.");
        }
    }
}
