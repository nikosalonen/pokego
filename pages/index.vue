<template>
  <div>
    <h1 class="text-xl text-gray-900 leading-tight">
      Short link your Pokemon Go friend code
    </h1>
    <div class="flex items-center py-2">
      <div class="text-base text-gray-600 leading-tight w-full">
        save my code as
        <br />
        <span
          class="flex flex-wrap block mt-1 pt-1 text-lg flex justify-center w-full"
        >
          <div
            class="w-full sm:w-1/2 block sm:inline-block sm:border-b sm:border-b-2 sm:border-gray-500 sm:text-right"
          >
            https://pokego.codes/
          </div>
          <div
            class="w-full sm:w-1/2 block sm:inline-block sm:border-b sm:border-b-2 sm:border-gray-500 text-2xl pt-5 sm:pt-0 sm:text-lg"
          >
            <input
              v-model="handle"
              class="text-center sm:text-left w-full block shadow appearance-none border rounded sm:border-none sm:shadow-none "
              type="text"
              placeholder="AshKetchum"
            />
          </div>
        </span>
      </div>
    </div>
    <div class="mt-4 flex flex-col">
      <h2>My friend code is:</h2>
      <form id="form" @submit="checkForm" class="max-w">
        <div class="flex flex-wrap  mb-2">
          <div class="w-1/3 px-1 sm:px-3 mb-6 md:mb-0">
            <input
              id="code1"
              ref="code1"
              v-on:keyup="checkLength"
              v-model="code1"
              maxlength="4"
              minlength="4"
              type="text"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div class="w-1/3 px-1 sm:px-3 mb-6 md:mb-0">
            <input
              id="code2"
              ref="code2"
              v-model="code2"
              v-on:keyup="checkLength"
              maxlength="4"
              minlength="4"
              type="text"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div class="w-1/3 px-1 sm:px-3 mb-6 md:mb-0">
            <input
              id="code3"
              ref="code3"
              v-model="code3"
              v-on:keyup="checkLength"
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
            value="Save"
            class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
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
          <span class="block border border-solid rounded my-4 items-center">
            <strong>
              <nuxt-link :to="userPageLink"
                >https://pokego.codes/{{ handle }}</nuxt-link
              ></strong
            >
          </span>
          If you want to edit your code you can use this link:
          <nuxt-link :to="editPageLink"
            >https://pokego.codes/edit/{{ result }}</nuxt-link
          >
          <!-- <router-link to="https://pokego.codes/edit/{{ result }}"
                  >https://pokego.codes/edit/{{ result }}</router-link
          >-->
          -- Don't lose it! There's no way to recover it.
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
    checkLength(e) {
      // eslint-disable-next-line
      const id = e.target.id
      const jump = e.target.value

      if (jump.length === 4) {
        if (id === 'code1') {
          this.$refs.code2.focus()
        } else if (id === 'code2') {
          this.$refs.code3.focus()
        }
      }
    },
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
