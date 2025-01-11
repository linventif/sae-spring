import { Component, createResource, createSignal, For, onMount, Show } from "solid-js";
import { A } from "@solidjs/router";
import icon from "../assets/icon.png";
import { fetchApi, getApiUrl } from "../utils";
import { makePersisted } from "@solid-primitives/storage";
import { createStore } from "solid-js/store";

import person from "../assets/person.png";

export const [isLogged, setIsLogged] = createSignal(false);
export const [bearerToken, setBearerToken] = createSignal(localStorage.getItem("bearerToken") || "");

interface User {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  password: string;
  profilePicture: string;
  admin: boolean;
}

export const [appUser, setAppUser] = createSignal({} as User);

const AddErrorComponent: Component = (props: any) => {
  return (
    <>
      <div class="text-error flex h-12 items-center rounded-lg border-error border p-4 gap-4">
        <i class="fa-regular fa-circle-xmark"></i>
        <span>Error : {props.message}</span>
      </div>
    </>
  );
};

const [bearerError, setBearerError] = createSignal("");

export async function getAppUser() {
  await fetchApi(`/api/users/me`)
    .then((response) => {
      if (response.ok) {
        setIsLogged(true);
        return response.json();
      } else {
        throw new Error("Invalid credentials");
      }
    })
    .then((data) => {
      setAppUser(data as User);
    });
}

async function getBearerToken(event: MouseEvent) {
  event.preventDefault();
  const email = (document.querySelector("#modal_login input[type='mail']") as HTMLInputElement).value;
  const password = (document.querySelector("#modal_login input[type='password']") as HTMLInputElement).value;

  await fetchApi(`/api/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.ok) {
        setIsLogged(true);
        return response.json();
      } else {
        throw new Error("Invalid credentials");
      }
    })
    .then((data) => {
      setBearerToken(data.token);
      localStorage.setItem("bearerToken", data.token);
    });

  await getAppUser();
}

const Header: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  onMount(async () => {
    if (bearerToken()) {
      await getAppUser();
    }
  });

  onMount(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (isOpen() && !event.target.closest(".dropdown")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const [navDropdownLinks] = createStore([
    {
      title: "User",
      content: [
        {
          title: "Mon Compte",
          fontAwesomeIcon: "fas fa-user",
          href: "/account",
        },
        {
          title: "Mes Réservations",
          fontAwesomeIcon: "fas fa-calendar-check",
          href: "/appointments",
        },
      ],
    },
    {
      title: "Other",
      content: [
        {
          title: "Déconnexion",
          fontAwesomeIcon: "fas fa-right-from-bracket",
          href: "/logout",
        },
      ],
    },
  ]);

  function resetBearerError() {
    (document.querySelector("#modal_login input[type='mail']") as HTMLInputElement).value = "";
    (document.querySelector("#modal_login input[type='password']") as HTMLInputElement).value = "";
    setBearerError("");
  }

  return (
    <>
      <dialog id="modal_login" class="modal">
        <div class="modal-box flex flex-col  gap-4 mx-auto p-4">
          <h1 class="text-2xl font-bold">Connexion</h1>
          <form class="flex flex-col gap-4">
            <Show when={bearerError()}>
              <AddErrorComponent message={bearerError()} />
            </Show>
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Adresse Email</span>
              </div>
              <input type="mail" placeholder="john@gmail.com" class="input input-bordered w-full" />
            </label>
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Mot de Passe</span>
              </div>
              <input type="password" placeholder="********" class="input input-bordered w-full" />
            </label>
            <button
              type="submit"
              class="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                getBearerToken(e).catch((error) => setBearerError(error.message));
                // @ts-ignore
                modal_login.close();
              }}
            >
              Connexion
            </button>
          </form>
          <div class="divider h-0" />
          <a href="/register" class="btn btn-secondary">
            Créer un Compte
          </a>
        </div>
        <form method="dialog" class="modal-backdrop" onClick={resetBearerError}>
          <button>close</button>
        </form>
      </dialog>

      <div class="navbar bg-background max-w-screen-2xl mx-auto p-4">
        <div class="flex-1">
          <img src={icon} alt="logo" width="45" height="45" />
          <A href="/" class="text-2xl font-bold ml-4 text-font whitespace-nowrap">
            Reservio
          </A>
        </div>

        <Show when={isLogged()}>
          <div class="flex-none">
            <div class="dropdown dropdown-end">
              <div tabIndex="0" role="button" class="btn btn-ghost hover:bg-transparent" onClick={() => setIsOpen(true)}>
                <div class="w-10 rounded-full overflow-hidden">
                  {<img alt="Tailwind CSS Navbar component" src={(appUser().profilePicture && `${getApiUrl()}/api/users/profile-picture/${appUser().profilePicture}`) || person} />}
                </div>
                <p class="text-[1.3em] text-soft-purple mx-2">{appUser().firstName + " " + appUser().lastName}</p>
                <i class={`text-[1.3em] fas ${isOpen() ? "fa-angle-up" : "fa-angle-down"}`}></i>
              </div>
              <ul tabIndex="0" class="menu dropdown-content mt-3 z-[1] p-4 gap-4 shadow bg-primary rounded-md min-w-[200px]">
                <For each={navDropdownLinks}>
                  {({ title, content }, index) => (
                    <>
                      <For each={content}>
                        {({ title, fontAwesomeIcon, href, condition }) => (
                          <>
                            <Show when={!condition || condition()}>
                              <li class="flex">
                                <A href={href} class="p-0 m-0 hover:font-bold hover:text-white text-gray-100 whitespace-nowrap hover:bg-transparent">
                                  <i class={fontAwesomeIcon + " " + "mr-1 flex w-[24px] justify-center"}></i>
                                  {title}
                                </A>
                              </li>
                            </Show>
                          </>
                        )}
                      </For>
                      {index() < navDropdownLinks.length - 1 && <hr class="border-1 border-[#6d6d6d]" />}
                    </>
                  )}
                </For>
              </ul>
            </div>
          </div>
        </Show>

        <Show when={!isLogged()}>
          <div class="flex-none">
            <button class="btn btn-primary" onClick="modal_login.showModal()">
              Connexion
            </button>
          </div>
        </Show>
      </div>

      <hr class="border-[1px] border-primary" />
    </>
  );
};

export default Header;
