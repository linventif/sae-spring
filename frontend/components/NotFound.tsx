import type { Component } from "solid-js";

const NotFound: Component = () => {
  return (
    <>
      <div class="flex flex-col items-center justify-center gap-6 my-auto w-full">
        <h1 class="text-6xl font-bold">404</h1>
        <p class="text-xl">The page you are looking for does not exist.</p>
      </div>
    </>
  );
};

export default NotFound;
