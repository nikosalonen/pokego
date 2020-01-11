<template>
  <div class="container mx-auto">Hello {{ user.handle }}</div>
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
