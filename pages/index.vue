<template>
  <div class="container mx-auto">
    <div class="max-w-lg mx-auto p-10 bg-white rounded-lg shadow-xl">
      <div class="sm:flex sm:items-center px-6 py-4">
        <!-- <img
          class="block mx-auto sm:mx-0 sm:flex-shrink-0 h-12 sm:h-16"
          src="~/static/pokeball.png"
        /> -->
        <div class="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
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
          <div class="mt-4">
            <h2>My friend code is:</h2>
            <form id="form" @submit="checkForm" class="w-full max-w-sm">
              <div class="flex items-stretch py-2">
                <input
                  v-model="code1"
                  maxlength="4"
                  nimlength="4"
                  type="number"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                -
                <input
                  v-model="code2"
                  maxlength="4"
                  nimlength="4"
                  type="number"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                -
                <input
                  v-model="code3"
                  maxlength="4"
                  nimlength="4"
                  type="number"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
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
                  https://pokego.codes/{{ handle }}
                </span>
                If you want to edit your code you can use this link:
                <nuxt-link :to="editPageLink"
                  >https://pokego.codes/edit/{{ result }}</nuxt-link
                >
                <!-- <router-link to="https://pokego.codes/edit/{{ result }}"
                  >https://pokego.codes/edit/{{ result }}</router-link
                > -->
                > -- Don't lose it! There's no way to recover it.
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
      editPageLink: ''
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
          // // eslint-disable-next-line
          // console.log(qs.size)
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
            // eslint-disable-next-line
          console.log('Document written with ID: ', res.id)
            this.result = res.id
            this.editPageLink = '/edit/' + res.id
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
.pokeball {
  max-width: 50px;
  height: auto;
}
</style>
