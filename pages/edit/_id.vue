<template>
  <div>
    <h1 class="text-xl text-gray-900 leading-tight">Hello {{ user.handle }}</h1>

    <div class="mt-4 flex flex-col">
      <h2>Your friend code is:</h2>
      <form id="form" @submit="updateUser" class="max-w-sm">
        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-1/3 px-3 mb-6 md:mb-0">
            <input
              id="code1"
              ref="code1"
              v-model="user.code[0]"
              maxlength="4"
              minlength="4"
              type="text"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div class="w-1/3 px-3 mb-6 md:mb-0">
            <input
              id="code2"
              ref="code2"
              v-model="user.code[1]"
              maxlength="4"
              minlength="4"
              type="text"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div class="w-1/3 px-3 mb-6 md:mb-0">
            <input
              id="code3"
              ref="code3"
              v-model="user.code[2]"
              maxlength="4"
              minlength="4"
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
</template>

<script>
import { fireDB } from '~/plugins/firestore.js'
export default {
  layout: 'default',
  components: {},
  data() {
    return {
      errors: [],
      user: {},
      result: ''
    }
  },
  async asyncData({ params, error }) {
    const user = await fireDB
      .collection('users')
      .doc(params.id)
      .get()
      .then((qs) => {
        return qs.data()
      })

    const codeSplit = '' + user.code
    user.code = codeSplit.match(/\d{4}/g)

    return { user }
  },
  methods: {
    updateFirestore() {
      // eslint-disable-next-line
      console.log(this.$route.params.id)

      fireDB
        .collection('users')
        .doc(this.$route.params.id)
        .update({
          code: Number(this.user.code.join(''))
        })
        .then(() => {
          this.result = true
        })
        .catch((e) => alert('Error updating document: ', e))
        .finally(() => {})
    },
    updateUser(e) {
      e.preventDefault()
      this.errors = []

      const regex = /^\d{4}$/
      if (
        !this.user.code[0].match(regex) ||
        !this.user.code[1].match(regex) ||
        !this.user.code[2].match(regex)
      ) {
        this.errors.push('Each part of the code should be 4 numbers long')
      }
      if (!this.errors.length) {
        this.updateFirestore()
        return true
      }
    }
  }
}
</script>

<style></style>
