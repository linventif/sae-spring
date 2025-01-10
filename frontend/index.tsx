/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router, useLocation } from "@solidjs/router";

import "./index.css";
import "flyonui/flyonui";

import Home from "./pages/Home";
import { Component, createEffect, createResource, onCleanup } from "solid-js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import TestCalendar from "./pages/TestCalendar";
import Professional from "./pages/Professional";
import Account from "./pages/Account";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error("Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?");
}
/*
import { createRouter, createWebHistory } from 'vue-router'

import { type IStaticMethods } from "flyonui/flyonui";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

...

const router = createRouter({
  ...
});

router.afterEach((to, from, failure) => {
  if (!failure) {
    setTimeout(() => {
      window.HSStaticMethods.autoInit();
    }, 100)
  }
});

export default router;
 */

import { type IStaticMethods } from "flyonui/flyonui";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

const App: Component = (props: any) => {
  const location = useLocation();

  createEffect(() => {
    setTimeout(() => {
      window.HSStaticMethods.autoInit();
    }, 100);
  }, [location.pathname]);

  return (
    <>
      <Header />
      <div>{props.children}</div>
      <Footer />
    </>
  );
};

render(
  () => (
    <Router root={App}>
      <Route path="/" component={Home} />
      <Route path="/calendar" component={TestCalendar} />
      <Route path="/profesional" component={Professional} />
      <Route path="/account" component={Account} />
      <Route path="*" component={NotFound} />
    </Router>
  ),
  root!,
);
