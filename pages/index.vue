<template>
  <div class="container mx-auto">
    <div class="max-w-lg mx-auto p-10 bg-white rounded-lg shadow-xl">
      <div class="sm:flex sm:items-center px-6 py-4">
        <img
          class="block mx-auto sm:mx-0 sm:flex-shrink-0 h-12 sm:h-16"
          src="~/static/pokeball.png"
        />
        <div class="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
          <h1 class="text-xl text-gray-900 leading-tight">
            Pokemon Go codes!
          </h1>
          <div class="flex items-center py-2">
            <p class="text-base text-gray-600 leading-tight">
              save my code as <br />
              http://pokego.codes/
              <input v-model="handle" type="text" />
            </p>
          </div>
          <div class="mt-4">
            <h2>My code is:</h2>
            <form class="w-full max-w-sm">
              <div class="flex items-center py-2">
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
            </form>
          </div>
          <div class="mt-4 flex justify-end">
            <button
              @click="writeToFirestore()"
              class=" flex-shrink-0  bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              color="primary"
              outlined
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'
import { fireDB } from '~/plugins/firestore.js'

export default {
  components: {},
  data() {
    return {
      handle: '',
      code1: '',
      code2: '',
      code3: ''
    }
  },
  methods: {
    writeToFirestore() {
      fireDB
        .collection('users')
        .add({
          handle: this.handle,
          code: this.code1 + '-' + this.code2 + '-' + this.code3
        })
        .then((res) => {
          // eslint-disable-next-line
          console.log('Document written with ID: ', res.id)
        })
        .catch((e) => alert(e))
        .finally(() => {
          // redirect to user page
        })
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
