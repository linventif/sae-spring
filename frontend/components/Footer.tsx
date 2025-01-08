import { A } from "@solidjs/router";
import type { Component } from "solid-js";

const Footer: Component = () => {
  return (
    <>
      <footer class="footer bg-base-200/60 px-6 py-4">
        <div class="flex w-full items-center justify-between">
          <aside class="grid-flow-col items-center">
            <p>
              Créer par{" "}
              <A href="https://gregoire-becue.me" class="link">
                Grégoire Launay--Bécue
              </A>{" "}
              en 2024-2025
            </p>
          </aside>
          <div class="flex gap-4 h-5">
            <a href="https://github.com/linventif/sae-spring" class="link" aria-label="Github Link">
              <span class="icon-[tabler--brand-github] size-5"></span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
