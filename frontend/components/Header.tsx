import type { Component } from "solid-js";

const Header: Component = () => {
  return (
    <>
      <nav class="navbar bg-base-100 rounded-box shadow">
        <div class="flex flex-1 items-center">
          <a class="link text-base-content link-neutral text-xl font-semibold no-underline" href="/">
            MedLib
          </a>
        </div>
        <div class="navbar-end flex items-center gap-4">
          <label class="swap swap-rotate">
            <input type="checkbox" value="light" class="theme-controller" />
            <span class="swap-on icon-[tabler--sun] size-[1.375rem]"></span>
            <span class="swap-off icon-[tabler--moon] size-[1.375rem]"></span>
          </label>
          <div class="dropdown relative inline-flex [--auto-close:inside] [--offset:8] [--placement:bottom-end]">
            <button id="dropdown-scrollable" type="button" class="dropdown-toggle flex items-center" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
              Grégoire Launay--Bécue
            </button>
            <ul class="dropdown-menu dropdown-open:opacity-100 hidden min-w-60" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-avatar">
              <li class="dropdown-header gap-2">
                <div class="avatar">
                  <div class="w-10 rounded-full">
                    <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" alt="avatar" />
                  </div>
                </div>
                <div>
                  <h6 class="text-base-content text-base font-semibold">John Doe</h6>
                  <small class="text-base-content/50">Admin</small>
                </div>
              </li>
              <li>
                <a class="dropdown-item" href="/account">
                  <span class="icon-[tabler--user]"></span>
                  Mon Compte
                </a>
              </li>
              <li class="dropdown-footer gap-2">
                <a class="btn btn-error btn-soft btn-block" href="#">
                  <span class="icon-[tabler--logout]"></span>
                  Se Déconnecter
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
