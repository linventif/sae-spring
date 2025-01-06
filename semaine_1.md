# S5 Sae RDV

## Auteurs

- Grégoire Launay-Bécue

## Fonctionnalités Principales

### Authentification

* Inscription : création d'un compte utilisateur avec nom, email et mot de passe.
* Connexion : authentification d'un utilisateur avec email et mot de passe.
* Récupération de mot de passe : envoi d'un email pour réinitialiser le mot de passe.

### Liste des Spécialistes

* Affichage des spécialistes : liste des spécialistes disponibles pour des rendez-vous.
* Profil du spécialiste : informations détaillées sur un spécialiste (nom, description, photo).
* Disponibilité du spécialiste : affichage des créneaux libres pour un spécialiste donné.

### Créneaux Disponibles

* Calendrier interactif : affichage des créneaux disponibles pour un spécialiste et une date donnée.
* Filtres de recherche : recherche des créneaux par date, heure, durée, etc.

### Prise de Rendez-Vous

* Réservation d'un créneau : choix d'un créneau libre pour un rendez-vous.
* Vérification des contraintes : vérification des contraintes avant la réservation (capacité, horaires, etc.)

### Gestion des Rendez-Vous | Utilisateur

* Consultation des rendez-vous : liste des rendez-vous passés et à venir pour un utilisateur.
* Modification d'un rendez-vous : changement de la date, de l'heure ou du spécialiste.
* Annulation d'un rendez-vous : suppression d'un rendez-vous réservé.
* Historique des rendez-vous : historique complet des rendez-vous pour un utilisateur.

### Gestion des Rendez-Vous | Spécialiste

* Consultation des rendez-vous : liste des rendez-vous passés et à venir pour un spécialiste.
* Historique des rendez-vous : historique complet des rendez-vous pour un spécialiste.
* Création de rendez-vous : ajout manuel d'un rendez-vous pour un utilisateur.
* Création de créneaux : ajout manuel de créneaux pour un spécialiste.
* Modification de créneaux : changement des horaires, de la capacité, etc.
* Annulation de rendez-vous : suppression d'un rendez-vous réservé par un utilisateur.
* Confirmation de rendez-vous : validation d'un rendez-vous réservé par un utilisateur.

## Fonctionnalités Avancées

* Notifications : envoi d'emails de confirmation, rappels et annulations de rendez-vous.
* Gestion des Données : stockage sécurisé des données utilisateurs et rendez-vous.
* Load Balancing : répartition de la charge pour gérer plusieurs utilisateurs simultanément.
* Monitoring : surveillance des performances et des erreurs pour une meilleure expérience utilisateur.
* Optimisation DB : indexation des requêtes pour des temps de réponse plus rapides.
* Internationalisation : support de plusieurs langues pour une utilisation mondiale.

## Structuration de l'Application

### Back-End

* Langage : Java (Spring Boot).
* Base de données : PostgreSQL (JDBC)
* Authentification : JWT (JSON Web Token)
* Documentation : Docusaurus
* Tests : JUnit, Mockito

### Front-End

* Langage : TypeScript (SolidJS)
* Interface : DaisyUI (Tailwind CSS)
* Authentification : JWT (JSON Web Token)

### Déploiement

* Serveur : Docker
* CI/CD : GitLab CI/CD
* Monitoring + Logs : Sentry

## Paramètres de Configuration

* Durée des créneaux : configurable (ex. 15 min, 30 min, 1h).
* Capacité maximale par créneau : nombre maximum de personnes autorisées.
* Horaires d'ouverture : plages horaires disponibles pour les rendez-vous.
* Jours de fonctionnement : jours de la semaine où les rendez-vous sont possibles.
* Délai de réservation minimum/maximum : par exemple, réservation au moins 24h à l'avance.
* Contraintes spécifiques : comme des pauses obligatoires après un certain nombre de rendez-vous.
* Intégration Avancée : ajout d'un recapitulatif du rendez-vous passé + potentiellement un système de paiement et 
  ordonance.

## Modèles de Données

### Utilisateur

* **ID** : *uuidv4* : identifiant unique de l'utilisateur.
* **Nom** : *string* : nom complet de l'utilisateur.
* **Prénom** : *string* : prénom de l'utilisateur.
* **Email** : *string* : adresse email de l'utilisateur.
* **Téléphone** : *string* : numéro de téléphone de l'utilisateur.
* **Photo** : *string* : URL de la photo de profil de l'utilisateur.
* **Genre** : *string* : genre de l'utilisateur (Homme, Femme, Autre).
* **Mot de passe** : *string* : hash du mot de passe.
* **Dernière Connexion** : *timestamp* : date de dernière connexion.
* **Création** : *timestamp* : date de création du compte.
* **Dernière Modification** : *timestamp* : date de la dernière modification.

### Créneau Disponible

* **ID** : *uuidv4* : identifiant unique du créneau.
* **Date** : *date* : date du créneau disponible.
* **Heure Début** : *time* : heure de début du créneau.
* **Heure Fin** : *time* : heure de fin du créneau.
* **Présentiel** : *boolean* : rendez-vous en présentiel ou à distance.
* **Spécialiste ID** : *uuidv4* : identifiant du spécialiste associé.
* **Statut** : *string* : statut du créneau (disponible, complet, annulé).
* **Lieu** : *string* : lieu où se déroule le rendez-vous (optionnel).
* **Dernière Modification** : *timestamp* : date de la dernière modification du créneau.
* **Création** : *timestamp* : date de création du créneau.
* **Dernière Modification** : *timestamp* : date de la dernière modification.

### Rendez-Vous

* **ID** : *uuidv4* : identifiant unique du rendez-vous.
* **Utilisateur ID** : *uuidv4* : identifiant de l'utilisateur ayant réservé.
* **Spécialiste ID** : *uuidv4* : identifiant du spécialiste concerné.
* **Créneau ID** : *uuidv4* : identifiant du créneau réservé.
* **Date** : *date* : date du rendez-vous.
* **Présentiel** : *boolean* : rendez-vous en présentiel ou à distance.
* **Heure Début** : *time* : heure de début du rendez-vous.
* **Heure Fin** : *time* : heure de fin du rendez-vous.
* **Statut** : *string* : statut du rendez-vous (confirmé, en attente, annulé).
* **Notes** : *string* : notes supplémentaires ou motif du rendez-vous.
* **Dernière Modification** : *timestamp* : date de la dernière modification du rendez-vous.
* **Création** : *timestamp* : date de création du rendez-vous.
* **Dernière Modification** : *timestamp* : date de la dernière modification.

### Spécialiste

* **ID** : *uuidv4* : identifiant unique du spécialiste.
* **Nom** : *string* : nom de famille du spécialiste.
* **Prénom** : *string* : prénom du spécialiste.
* **Email** : *string* : adresse email du spécialiste.
* **Téléphone** : *string* : numéro de téléphone du spécialiste.
* **Photo** : *string* : URL de la photo de profil.
* **Description** : *string* : présentation ou biographie du spécialiste.
* **Spécialité** : *string* : domaine d'expertise (ex. dentiste, kinésithérapeute).
* **Adresse** : *string* : adresse professionnelle.
* **Code Postal** : *string* : code postal du lieu d'exercice.
* **Ville** : *string* : ville du lieu d'exercice.
* **Pays** : *string* : pays du lieu d'exercice.
* **Mot de passe** : *string* : hash du mot de passe.
* **Dernière Connexion** : *timestamp* : date de la dernière connexion.
* **Création** : *timestamp* : date de création du compte.
* **Dernière Modification** : *timestamp* : date de la dernière modification.

### Contraintes Créneaux

* **ID** : *uuidv4* : identifiant unique de la contrainte.
* **Créneau ID** : *uuidv4* : identifiant du créneau concerné.
* **Contrainte** : *string* : type de contrainte (pause, capacité, horaires).
* **Valeur** : *string* : valeur de la contrainte (ex. 15 min, 30 min, 1h).
* **Création** : *timestamp* : date de création de la contrainte.
* **Dernière Modification** : *timestamp* : date de la dernière modification.

## Relations entre les Modèles

* Un utilisateur peut réserver plusieurs rendez-vous.
* Un rendez-vous est associé à un seul utilisateur.
* Un rendez-vous est lié à un créneau disponible.
* Un créneau disponible est associé à un seul spécialiste.
* Un spécialiste peut avoir plusieurs créneaux disponibles.

## API Endpoints

### Authentification

- **POST** `/api/auth/register` : inscription d'un nouvel utilisateur.
- **POST** `/api/auth/login` : connexion d'un utilisateur existant.
- **POST** `/api/auth/forgot-password` : demande de réinitialisation du mot de passe.
- **POST** `/api/auth/reset-password` : réinitialisation du mot de passe avec un token.

### Utilisateurs

- **GET** `/api/users/{id}` : obtenir les informations d'un utilisateur.
- **PUT** `/api/users/{id}` : mettre à jour les informations d'un utilisateur.
- **DELETE** `/api/users/{id}` : supprimer le compte d'un utilisateur.

### Spécialistes

- **GET** `/api/specialists` : liste des spécialistes disponibles.
- **GET** `/api/specialists/{id}` : détails d'un spécialiste.
- **POST** `/api/specialists` : création d'un nouveau spécialiste (admin).
- **PUT** `/api/specialists/{id}` : mise à jour des informations d'un spécialiste.
- **DELETE** `/api/specialists/{id}` : suppression d'un spécialiste.

### Créneaux

- **GET** `/api/slots` : liste des créneaux disponibles avec filtres.
- **GET** `/api/slots/{id}` : détails d'un créneau spécifique.
- **POST** `/api/slots` : création d'un nouveau créneau (spécialiste).
- **PUT** `/api/slots/{id}` : mise à jour d'un créneau (spécialiste).
- **DELETE** `/api/slots/{id}` : suppression d'un créneau (spécialiste).

### Rendez-Vous

- **GET** `/api/appointments` : liste des rendez-vous de l'utilisateur connecté.
- **GET** `/api/appointments/{id}` : détails d'un rendez-vous.
- **POST** `/api/appointments` : réservation d'un rendez-vous.
- **PUT** `/api/appointments/{id}` : modification d'un rendez-vous.
- **DELETE** `/api/appointments/{id}` : annulation d'un rendez-vous.
- **POST** `/api/appointments/{id}/confirm` : confirmation d'un rendez-vous (spécialiste).

