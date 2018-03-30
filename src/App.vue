<template lang="pug">
.app
  h1 Vue FAQ
  template(v-for="q in questions")
    span {{q.question}}
    br
    span {{q.answer}}
  span(v-if="!Object.keys(questions).length") Грузим вопросы...
</template>

<script>
import {db} from './fb'

export default {
  async created() {
    const qc = db.collection('questions')
    const qs = await qc.get()
    qs.forEach(q =>
      Vue.set(this.questions, q.id, {...q.data(), id: q.id})
    )
  },
  data() { return {
    questions: {},
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
