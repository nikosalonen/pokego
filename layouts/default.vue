<template>
  <div class="container mx-auto">
    <div class="max-w-lg mx-auto p-2 md:p-10 bg-white rounded-lg sm:shadow-xl">
      <div class="flex flex-col sm:flex sm:items-center px-6 py-4">
        <div class="mt-4">
          <nuxt-link to="/">
            <img
              class="block mx-auto sm:mx-0 sm:flex-shrink-0 h-12 sm:h-16"
              src="~/static/pokeball.png"
            />
          </nuxt-link>
        </div>
        <div class="mt-4 text-center sm:text-left">
          <nuxt />
        </div>
      </div>
      <div class="w-1/2 flex m-auto pt-10"></div>
      <div>
        <div class="text-center text-xs text-gray-900 m-auto pt-5">
          This site is not affiliated with Niantic, Inc. and is only a tool to
          help share Pokemon Go Friend Code online identifiers.
          <nuxt-link
            class="underline pointer-events-auto cursor-pointer text-teal-400 font-bold"
            to="/privacy"
            >Privacy policy</nuxt-link
          >
        </div>
        <div class="text-center text-xs text-gray-300 m-auto pt-5">
          Icon made by
          <a
            href="https://www.flaticon.com/authors/darius-dan"
            title="Darius Dan"
            target="_blank"
            >Darius Dan</a
          >
          from
          <a href="https://www.flaticon.com/" title="Flaticon" target="_blank"
            >www.flaticon.com</a
          >
          <br />
        </div>
      </div>
    </div>
  </div>
</template>
