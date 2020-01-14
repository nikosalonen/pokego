<template>
  <div>
    <div v-if="errors.length">
      <h1 class="text-xl text-gray-900 leading-tight">
        Trainer named <strong>{{ $route.params.id }}</strong> can't be found.
        Maybe you mistyped the name?
      </h1>
      <div class="flex flex-col items-center py-10 justify-center">
        <nuxt-link
          class="underline pointer-events-auto cursor-pointer text-teal-400 font-bold"
          to="/"
          >Create your own link</nuxt-link
        >
      </div>
    </div>
    <div v-else>
      <h1 class="text-xl text-gray-900 leading-tight">
        Pokemon trainer
        <strong>{{ user.handle }}</strong> wants to be your friend!
      </h1>
      <div class="mt-4">
        <h2>The friend code is:</h2>

        <div class="flex flex-row justify-center items-stretch py-2">
          <span
            class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight text-xl"
            >{{ user.code[0] }}-{{ user.code[1] }}-{{ user.code[2] }}</span
          >
        </div>
        <div class="flex flex-col items-center py-2 justify-center">
          <p>You can also use this QR code:</p>
          <canvas
            id="canvas"
            ref="canvas"
            class="block object-contain h-48 w-full border border-solid"
          ></canvas>
        </div>
        <div class="flex flex-col items-center py-10 justify-center">
          <nuxt-link
            class="underline pointer-events-auto cursor-pointer text-teal-400 font-bold"
            to="/"
            >Create your own link</nuxt-link
          >
        </div>
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
      result: '',
      canvas: ''
    }
  },
  async asyncData({ params, error }) {
    const user = await fireDB
      .collection('users')
      .where('handle', '==', params.id.toLowerCase())
      .get()
      .then((qs) => {
        if (!qs.empty) {
          const user = qs.docs[0]
          return user.data()
        }
      })
    // eslint-disable-next-line
    console.log(user)

    if (typeof user === 'undefined') {
      return { errors: '404' }
    } else if (typeof user !== 'undefined') {
      const codeSplit = '' + user.code
      user.code = codeSplit.match(/\d{4}/g)
    }
    return { user }
  },
  mounted() {
    if (process.browser && this.user && this.user.code) {
      const QRCode = require('qrcode')
      QRCode.toCanvas(
        document.getElementById('canvas'),
        this.user.code,
        (error) => {
          // eslint-disable-next-line
          if (error) console.error('qr error',error)
        }
      )
    }
  },
  methods: {}
}
</script>

<style></style>
