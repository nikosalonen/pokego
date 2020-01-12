<template>
  <div class="container mx-auto">
    <div class="max-w-lg mx-auto p-10 bg-white rounded-lg shadow-xl">
      <div class="flex flex-col sm:flex sm:items-center px-6 py-4">
        <!-- <img
          class="block mx-auto sm:mx-0 sm:flex-shrink-0 h-12 sm:h-16"
          src="~/static/pokeball.png"
        /> -->
        <div class="mt-4  text-center sm:text-left">
          <h1 class="text-xl text-gray-900 leading-tight">
            Short link your Pokemon Go friend code
          </h1>
          <div class="flex items-center py-2">
            <div class="text-base text-gray-600 leading-tight w-full">
              save my code as <br />
              <span class="block mt-1 pt-1 text-lg flex justify-center"
                >https://pokego.codes/
                <div class="border-b border-b-2 border-gray-500">
                  <input
                    v-model="handle"
                    type="text"
                    placeholder="AshKetchum"
                  />
                </div>
              </span>
            </div>
          </div>
          <div class="mt-4 flex flex-col">
            <h2>My friend code is:</h2>
            <form id="form" @submit="checkForm" class=" max-w-sm">
              <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-1/3 px-3 mb-6 md:mb-0">
                  <input
                    v-model="code1"
                    maxlength="4"
                    nimlength="4"
                    type="text"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>
                <div class="w-1/3 px-3 mb-6 md:mb-0">
                  <input
                    v-model="code2"
                    maxlength="4"
                    nimlength="4"
                    type="text"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>
                <div class="w-1/3 px-3 mb-6 md:mb-0">
                  <input
                    v-model="code3"
                    maxlength="4"
                    nimlength="4"
                    type="text"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>
              </div>
              <div
                v-if="errors.length"
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <b>Please correct the following error(s):</b>
                <ul>
                  <li v-for="error in errors">{{ error }}</li>
                </ul>
              </div>
              <div class="mt-4 flex justify-end">
                <input
                  type="submit"
                  value="Save"
                  class=" flex-shrink-0  bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                  color="primary"
                  outlined
                />
              </div>
              <!--

            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-city"
              >
                City
              </label>
              <input
                id="grid-city"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Albuquerque"
              />
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
              >
                State
              </label>
              <div class="relative">
                <select
                  id="grid-state"
                  class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option>New Mexico</option>
                  <option>Missouri</option>
                  <option>Texas</option>
                </select>
                <div
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                >
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-zip"
              >
                Zip
              </label>
              <input
                id="grid-zip"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="90210"
              />
            </div>
          </div> -->
            </form>
          </div>

          <div v-if="result" class="mt-4">
            <div
              class="bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <p>
                <strong>All done!</strong> You can now share your friend code by
                giving this link to your friends:
                <span
                  class="block border border-solid rounded my-4 items-center"
                >
                  <nuxt-link :to="userPageLink"
                    >https://pokego.codes/edit/{{ result }}</nuxt-link
                  >
                </span>
                If you want to edit your code you can use this link:
                <nuxt-link :to="editPageLink"
                  >https://pokego.codes/edit/{{ result }}</nuxt-link
                >
                <!-- <router-link to="https://pokego.codes/edit/{{ result }}"
                  >https://pokego.codes/edit/{{ result }}</router-link
                > -->
                -- Don't lose it! There's no way to recover it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fireDB } from '~/plugins/firestore.js'

export default {
  components: {},
  data() {
    return {
      errors: [],
      handle: '',
      code1: '',
      code2: '',
      code3: '',
      result: '',
      editPageLink: '',
      userPageLink: ''
    }
  },
  methods: {
    checkForm(e) {
      e.preventDefault()
      this.errors = []
      if (!this.handle) {
        this.errors.push('Please add name')
      }

      const regex = /^\d{4}$/
      if (
        !this.code1.match(regex) ||
        !this.code2.match(regex) ||
        !this.code3.match(regex)
      ) {
        this.errors.push('Each part of the code should be 4 numbers long')
      }
      if (!this.errors.length) {
        this.writeToFirestore()
        return true
      }
    },
    async checkHandle() {
      const handleFound = await fireDB
        .collection('users')
        .where('handle', '==', this.handle)
        .get()
        .then((qs) => {
          return qs.size
        })
      return handleFound
    },
    async writeToFirestore() {
      const handleCheckResult = await this.checkHandle()
      if (!handleCheckResult) {
        fireDB
          .collection('users')
          .add({
            handle: this.handle,
            code: Number(this.code1 + '' + this.code2 + '' + this.code3)
          })
          .then((res) => {
            this.result = res.id
            this.editPageLink = '/edit/' + res.id
            this.userPageLink = '/' + this.handle
          })
          .catch((e) => alert(e))
          .finally(() => {})
      } else {
        this.errors.push('Handle taken, maybe try another?')
      }
    }
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
