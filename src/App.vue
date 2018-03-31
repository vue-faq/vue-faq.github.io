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
          span(v-html="clickable(q.answer)" class="ca")

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
    },
    clickable (text) {
      const regexp = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?)/gi
      return text.toString().replace(regexp, '<a href="$1" target="_blank">$1</a>')
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
  user-select none
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

<style>
html {
  cursor: url('data:image/svg+xml;utf8,<svg version="1.1" id="svg2" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16.5 19" style="enable-background:new 0 0 16.5 19;" xml:space="preserve"><style type="text/css">.st0{fill:#4DBA87;}.st1{fill:#435466;}</style><g id="g10" transform="matrix(1.3333333,0,0,-1.3333333,0,400)"><g id="g12" transform="translate(178.0626,235.0086)"><path id="path14" class="st0" d="M-173.3,53.5l0,3.3l2.9-1.6l4.8,2.7l-12.4,7.1l0-14.3L-173.3,53.5z"/></g><g id="g16" transform="translate(178.0626,235.0086)"><path id="path18" class="st1" d="M-173.3,53.5l0,3.3l2.9-1.6l2.3,1.3l-7.4,4.3l0-8.6L-173.3,53.5z"/></g></g></svg>'), auto;
}
</style>
