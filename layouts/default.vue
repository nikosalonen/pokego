<template>
  <div class="container mx-auto">
    <div class="max-w-lg mx-auto p-2 md:p-10 bg-white rounded-lg shadow-xl">
      <div class="flex flex-col sm:flex sm:items-center px-6 py-4">
        <div class="mt-4">
          <nuxt-link to="/">
            <img
              class="block mx-auto sm:mx-0 sm:flex-shrink-0 h-12 sm:h-16"
              src="~/static/pokeball.png"
            />
          </nuxt-link>
        </div>
        <div class="mt-4  text-center sm:text-left">
          <nuxt />
        </div>
      </div>
      <div class="w-1/2 flex m-auto pt-10">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://brave.com/pok897"
        >
          <img
            src="~/static/switch_banner_1@2x.png"
            alt="Download Brave Browser"
            title="Download Brave Browser"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<style></style>
