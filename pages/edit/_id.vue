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
            Hello {{ user.handle }}
          </h1>

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
                  value="Update"
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
                <strong>Friend code updated!</strong>
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
      user: {}
    }
  },
  async asyncData({ params, error }) {
    const user = await fireDB
      .collection('users')
      .doc(params.id)
      .get()
      .then((qs) => {
        // // eslint-disable-next-line

        return qs.data()
      })
    // eslint-disable-next-line
    user.code1
    return { user }
  },
  methods: {
    async getUser() {
      const handleFound = await fireDB
        .collection('users')
        .doc(this.$route.params.id)
        .get()
        .then((qs) => {
          // // eslint-disable-next-line
          // console.log(qs.size)
          return qs.data()
        })
      // eslint-disable-next-line
      debugger
      return handleFound
    }
  }
}
</script>

<style></style>
