<template lang="pug">
  .app
    h1 {{msg}}
</template>

<script>
export default {
  props: {
    backUrl: String,
  },
  data() { return {
      msg: 'Hello, Vue world!'
  }},
  components: {
  },
}
</script>

<style scoped lang="stylus">
vue = #40B181
.app h1
  color vue
</style>
