/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";

import "./index.css";

import Home from "./pages/Home";
import { Component } from "solid-js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import TestCalendar from "./pages/TestCalendar";
import Professional from "./pages/Professional";
import Account from "./pages/Account";
import Login from "./pages/Login";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error("Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?");
}

const App: Component = (props: any) => {
  return (
    <>
      <Header />
      <div class="flex-grow flex-shrink-0 flex-auto flex flex-col min-h-[calc(100vh_-_160px)]">{props.children}</div>
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
      <Route path="/login" component={Login} />
      <Route path="*" component={NotFound} />
    </Router>
  ),
  root!,
);
