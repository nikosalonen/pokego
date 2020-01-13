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
            Pokemon trainer <strong>{{ user.handle }}</strong> wants to be your
            friend!
          </h1>
          <div class="mt-4">
            <h2>The friend code is:</h2>

            <div class="flex flex-row justify-center items-stretch py-2">
              <span
                class="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight"
              >
                {{ user.code[0] }}-{{ user.code[1] }}-{{ user.code[2] }}
              </span>
            </div>
            <div class="flex flex-col items-center py-2 justify-center">
              <p>
                You can also use this QR code:
              </p>
              <canvas
                id="canvas"
                ref="canvas"
                class="block object-contain h-48 w-full border border-solid"
              ></canvas>
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
      user: {},
      result: '',
      canvas: ''
    }
  },
  async asyncData({ params, error }) {
    // eslint-disable-next-line

    // return { user: { handle: 'dmni', code: ['1234', '1234', '1234'] } }
    const user = await fireDB
      .collection('users')
      .where('handle', '==', params.id)
      .get()
      .then((qs) => {
        if (!qs.empty) {
          const user = qs.docs[0]
          return user.data()
        }
      })
    if (user.code) {
      const codeSplit = '' + user.code
      user.code = codeSplit.match(/\d{4}/g)
    }
    return { user }
  },
  mounted() {
    if (process.browser) {
      const QRCode = require('qrcode')
      // eslint-disable-next-line
    const canvas = document.getElementById('canvas')
      // eslint-disable-next-line
    console.log(canvas)
      if (canvas) {
        QRCode.toCanvas(canvas, this.user.code, (error) => {
          // eslint-disable-next-line
    if (error) console.error(error)
          // eslint-disable-next-line
    console.log('success!')
        })
      }
    }
  },
  methods: {}
}
</script>

// <style></style>
