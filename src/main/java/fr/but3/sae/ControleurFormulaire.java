package fr.but3.sae;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ControleurFormulaire {

    @Autowired
    private EtudiantRepository etudiantRepository;

    @GetMapping("/etudiants")
    public List<Etudiant> afficherFormulaire() {
        return (List<Etudiant>) etudiantRepository.findAll();
    }

    @PostMapping("/etudiants")
    public String ajouterEtudiant(@Valid @RequestBody Etudiant etudiant, BindingResult result) {
        if (result.hasErrors()) {
            return "Erreur de validation: " + result.getAllErrors();
        }
        etudiantRepository.save(etudiant);
        return "Etudiant ajouté avec succès";
    }

    @PutMapping("/etudiants/{id}")
    public String modifierEtudiant(@PathVariable Long id, @Valid @RequestBody Etudiant etudiant, BindingResult result) {
        if (result.hasErrors()) {
            return "Erreur de validation: " + result.getAllErrors();
        }
        etudiant.setId(id);
        etudiantRepository.save(etudiant);
        return "Etudiant modifié avec succès";
    }

    @DeleteMapping("/etudiants/{id}")
    public String supprimerEtudiant(@PathVariable Long id) {
        etudiantRepository.deleteById(id);
        return "Etudiant supprimé avec succès";
    }

    @GetMapping("/etudiants/{id}")
    public Etudiant afficherEtudiant(@PathVariable Long id) {
        return etudiantRepository.findById(id).orElse(null);
    }
}