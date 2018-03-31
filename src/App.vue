<template lang="pug">
v-app
  fv(v-if="questions.length")
  v-container(fluid class="zindex")
    v-layout(v-if="!questions.length")
      v-alert(outline color="info" icon="info" :value="true") Грузим вопросы...
    v-layout(v-else justify-center)
      v-flex(xs12 sm6 lg5)
        h1(class="head__title") Vue FAQ

        a(href="https://vuejs.org/v2/guide/" title="vue doc" class="pray") 🙏🏻 Вот по этой ссылке ваша библия и коран! молитесь на нее днем и ночью, утром и вечером, в радости и печали, в здравии и нездравии.. всегда в общем!
        v-layout(justify-center)
          v-flex
            v-select(label="Количество ответов на странице" v-model="perPage" :items="[2, 5, 10, 25, 50, 100]" class="select-quests" hide-details)
            v-text-field(
                v-model="query"
                label="Поиск тупых вопросов"
                prepend-icon="search"
                class="search"
                hide-details)

        v-card(class="question" v-for="(q, i) in qorp" :key="q.id")
          span(v-html="q.question" class="cq")
          span(v-html="q.answer" class="ca")

        v-layout
          v-flex(xs10 class="text-xs-center")
            v-pagination(v-model="page" :length="totalPages")
</template>

<script lang="js">
import { db } from './fb'
import fv from './flyingVue.js'

export default {
  components: {
    fv
  },
  data () {
    return {
      questions: [],
      query: '',
      page: 1,
      perPage: 10
    }
  },
  async created () {
    const qc = db.collection('questions')
    const qs = await qc.get()

    qs.forEach(q => {
      let obj = {...q.data(), id: q.id}
      this.questions.push(obj)
    })
    // qs.forEach(q => Vue.set(this.questions, q.id, { ...q.data(), id: q.id }))
  },
  computed: {
    qorp () {
      return this.query.length > 0 ? this.qSearched : this.paginated()
    },
    qSearched () {
      if (this.query.length > 0) {
        return this.questions.slice().filter(x => x.question.toLowerCase().match(this.query.toLowerCase()))
      }
      return this.questions
    },
    totalPages () {
      return Math.ceil(this.questions.length / this.perPage)
    }
  },
  methods: {
    paginated () {
      if (this.page >= this.totalPages) this.page = this.totalPages

      const idx = this.page * this.perPage - this.perPage
      // i really dont know how this shit works.. just 4.20 am and i made it //@rei
      const pList = this.questions.slice(idx, this.perPage + idx)

      return pList
    }
  }
}
</script>

<style scoped lang="stylus">
vue = #40B181

a
  text-decoration none

.zindex
  z-index 5

#app
  min-height 100vh
  font-family 'open sans', 'roboto', 'helvetica'
.head__title
  color vue
  text-align center
  font-size 40px
.question
  margin 1rem 0
  transition .3s linear
  font-size 1.2rem
  padding 1rem
  display flex
  flex-flow column
  &:hover
    box-shadow 1px 1px 6px 1px vue
    transform scale(1.02)
    cursor pointer
  .cq
    font-weight 600
    font-size 20px

.pray
  font-size 14px
  color #b0bec5
  margin-bottom .5rem
  transition-property text-shadow,color
  transition .2s ease
  &:hover
    color vue
    text-shadow 0 1px vue
    background-color transparent

.select-quests
  margin-top 1rem
</style>
