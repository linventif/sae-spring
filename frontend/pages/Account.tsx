import type { Component } from "solid-js";
import { fetchApi, getApiUrl } from "../utils";
import { setAppUser, appUser, getAppUser } from "../components/Header";

async function uploadFile(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  return await fetchApi(`/api/users/profile-picture`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Invalid file");
      }
      return response.json();
    })
    .then((data) => {
      getAppUser();
    });
}

const Account: Component = () => {
  return (
    <>
      <div class="flex flex-col container mx-auto gap-4 m-4  max-w-screen-lg">
        <h2 class="text-2xl py-4 font-bold">Mon Compte</h2>

        <div class="border border-primary rounded-lg">
          <div class="flex flex-col gap-4 p-4">
            <h2 class="text-lg font-bold">Profil</h2>

            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <label class="form-control w-full">
                <div class="label">
                  <span class="label-text">Image de Profil</span>
                </div>
                <input type="file" class="file-input file-input-bordered w-full" onChange={uploadFile} />
              </label>
            </div>
          </div>
        </div>

        <div class="border border-primary rounded-lg">
          <div class="flex flex-col gap-4 p-4">
            <h2 class="text-lg font-bold">Identité</h2>

            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <label class="form-control w-full ">
                <div class="label">
                  <span class="label-text">First Name</span>
                </div>
                <input type="text" placeholder={appUser().firstName} class="input input-bordered w-full " />
              </label>
              <label class="form-control w-full ">
                <div class="label">
                  <span class="label-text">Last Name</span>
                </div>
                <input type="text" placeholder={appUser().lastName} class="input input-bordered w-full " />
              </label>
              <label class="form-control w-full ">
                <div class="label">
                  <span class="label-text">Address</span>
                </div>
                <input type="text" placeholder={appUser().address} class="input input-bordered w-full " />
              </label>
            </div>
          </div>
        </div>

        <div class="border border-primary rounded-lg">
          <div class="flex flex-col gap-4 p-4">
            <h2 class="text-lg font-bold">Connexion</h2>

            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <label class="form-control w-full ">
                <div class="label">
                  <span class="label-text">Email</span>
                </div>
                <input type="email" placeholder={appUser().email} class="input input-bordered w-full " />
              </label>
              <label class="form-control w-full ">
                <div class="label">
                  <span class="label-text">Password</span>
                </div>
                <input type="password" placeholder="********" class="input input-bordered w-full " />
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
