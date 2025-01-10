import type { Component } from "solid-js";

const Account: Component = () => {
  return (
    <>
      <div class="flex flex-col container mx-auto gap-4 m-4  max-w-screen-lg">
        <h2 class="text-2xl font-semibold">Mon Compte</h2>
        {/* this is not account creation but edition of a already existing account*/}

        <h3 class="text-lg mt-6 font-semibold">Image de Profil</h3>
        {/* Profile Picture*/}
        {/* Profile Picture*/}
        <div
          data-file-upload='{
          "url": "/upload",
          "acceptedFiles": "image/*",
          "maxFiles": 1,
          "singleton": true
        }'
        >
          <template data-file-upload-preview="">
            <div class="size-20">
              <img class="w-full rounded-full object-contain" data-dz-thumbnail="" />
            </div>
          </template>

          <div class="flex flex-wrap items-center gap-3 sm:gap-5">
            <div class="group" data-file-upload-previews="" data-file-upload-pseudo-trigger="">
              <span class="border-base-content/30 text-base-content/50 flex size-20 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-dotted hover:bg-base-200/60 group-has-[div]:hidden">
                <span class="icon-[tabler--user-circle] size-9 shrink-0"></span>
              </span>
            </div>
            <div class="grow">
              <div class="flex items-center gap-x-2">
                <button type="button" class="btn btn-primary" data-file-upload-trigger="">
                  <span class="icon-[tabler--upload] size-4 shrink-0"></span>
                  Upload photo
                </button>
                <button type="button" class="btn btn-outline btn-secondary" data-file-upload-clear="">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <h3 class="mt-6 text-lg font-semibold">Identité</h3>
        {/* First Name */}
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label class="label label-text" htmlFor="firstName">
              Prénom
            </label>
            <input id="firstName" type="text" placeholder="John" class="input" required />
            <span class="error-message">Entrez votre prénom.</span>
          </div>
          {/* Last Name */}
          <div>
            <label class="label label-text" htmlFor="lastName">
              Nom
            </label>
            <input id="lastName" type="text" placeholder="Doe" class="input" required />
            <span class="error-message">Entrez votre nom.</span>
          </div>
          {/* address */}
          <div>
            <label class="label label-text" htmlFor="address">
              Adresse
            </label>
            <input id="address" type="text" class="input" placeholder="1 rue de Paris, 75000 Paris" required />
            <span class="error-message">Entrez votre adresse.</span>
          </div>
          {/* phone number */}
          <div>
            <label class="label label-text" htmlFor="phoneNumber">
              Numéro de Téléphone
            </label>
            <input id="phoneNumber" type="tel" class="input" placeholder="06 12 34 56 78" required />
            <span class="error-message">Entrez un numéro de téléphone valide.</span>
          </div>
        </div>

        <h3 class="text-lg mt-6 font-semibold">Connexion</h3>
        {/* Email */}
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label class="label label-text" htmlFor="userEmail">
              Email
            </label>
            <input id="userEmail" type="email" class="input" placeholder="john@gmail.com" aria-label="john@gmail.com" required="" />
            <span class="error-message">Entrez une adresse email valide.</span>
          </div>
          <div>
            <label class="label label-text" htmlFor="userPassword">
              Mot de Passe
            </label>
            <input id="userPassword" type="password" class="input" placeholder="********" required />
            <span class="error-message">Entrez un mot de passe valide.</span>
          </div>
        </div>

        <h3 class="text-lg mt-6 font-semibold">Paramètres</h3>
        {/* Language */}
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label class="label label-text" htmlFor="language">
              Langue
            </label>
            <select id="language" class="input">
              <option value="fr">Français</option>
              <option value="en">Anglais</option>
            </select>
          </div>
          {/* Theme */}
          <div>
            <label class="label label-text" htmlFor="theme">
              Thème
            </label>
            <select id="theme" class="input">
              <option value="light">Clair</option>
              <option value="dark">Sombre</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
