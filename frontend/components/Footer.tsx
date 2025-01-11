import { A } from "@solidjs/router";
import type { Component } from "solid-js";
import icon from "../assets/icon.png";

const Footer: Component = () => {
  return (
    <>
      <hr class="border-[1px] border-primary" />
      <footer class="footer px-10 py-4 bg-background text-base-content max-w-screen-2xl mx-auto">
        <aside class="items-center grid-flow-col">
          <img src={icon} alt="logo" width="40" height="40" />
          <div class="ml-2 flex flex-col">
            <h3 class="text-font font-bold">Reservio</h3>
            <p>Reservio est une application de gestion de rendez-vous.</p>
          </div>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
