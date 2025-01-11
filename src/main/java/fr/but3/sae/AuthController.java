package fr.but3.sae;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?>  login(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
        );

        return ResponseEntity.ok(Collections.singletonMap("token", jwtUtil.generateToken(authRequest.getEmail())));
    }

    @GetMapping("/me")
    public ResponseEntity<?>  me(@RequestHeader("Authorization") String authorization) {
        String email = jwtUtil.extractEmail(authorization.substring("Bearer ".length()));
        return ResponseEntity.ok(Collections.singletonMap("email", email));
    }

    @GetMapping("/hello")
    public ResponseEntity<?>  info() {
        return ResponseEntity.ok(Collections.singletonMap("message", "Hello World"));
    }
}