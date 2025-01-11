package fr.but3.sae.appUser;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, String> {

    /**
     * Recherche un utilisateur par son adresse email.
     *
     * @param email l'adresse email de l'utilisateur
     * @return un Optional contenant l'utilisateur s'il existe
     */
    Optional<AppUser> findByEmail(String email);

}