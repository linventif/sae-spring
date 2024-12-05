package fr.but3.sae;

import org.springframework.data.repository.CrudRepository;

public interface EtudiantRepository extends CrudRepository<Etudiant, Long> {
    Etudiant findByNom(String nom);
    Etudiant findByPrenom(String prenom);
    Etudiant findByAge(int age);
    Etudiant findByGroupe(String groupe);

}