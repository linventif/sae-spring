import { Component, createResource, createSignal, For } from "solid-js";
import { fetchApi } from "../utils";
import professional_default_image from "../assets/professional_default_image.jpg";

const Home: Component = () => {
  const [professionals, setProfessionals] = createResource("professionalsList", async () => {
    return await fetchApi("/api/business").then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Invalid credentials");
    });
  });

  return (
    <div class="flex flex-col py-12 gap-12">
      <div class="flex flex-col justify-center h-60 my-auto container mx-auto max-w-screen-sm p-4 gap-12">
        <h1 class="text-4xl text-center  font-bold">Chercher un Professionnel</h1>
        <label class="input input-bordered flex items-center gap-2">
          <input type="text" class="grow" placeholder="Search" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
            <path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" />
          </svg>
        </label>
      </div>
      <div class="flex flex-col container mx-auto gap-4 m-4 max-w-screen-lg">
        <For
          each={professionals()}
          fallback={
            <>
              <div class="skeleton h-64 w-full" />
              <div class="skeleton h-64 w-full" />
              <div class="skeleton h-64 w-full" />
            </>
          }
        >
          {({ name, address, businessType }) => (
            <div class="border border-primary rounded-lg h-64 w-full">
              <div class="join-item flex flex-col gap-4 p-4 border-r h-full w-80 border-primary">
                <div class="flex gap-4 w-full">
                  <img src={professional_default_image} alt="Professional Profil Picture" class="w-16 h-16 rounded-lg" />
                  <div class="flex h-full flex-col justify-around">
                    <h3 class="text-lg font-bold">{name}</h3>
                    <div class="flex gap-2">{businessType}</div>
                  </div>
                </div>
                <a class="link flex gap-2" href={`https://www.google.fr/maps/place/${address}`} target="_blank" rel="noreferrer">
                  <div className="flex justify-center items-center">
                    <i className="fa-solid fa-building"></i>
                  </div>
                  {address}
                </a>
                <div class="h-full" />
                <button class="btn btn-primary">Nouveau Rendez-Vous</button>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default Home;
