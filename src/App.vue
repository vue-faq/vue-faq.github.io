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
  cursor: url('data:image/svg+xml;utf8,<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" viewBox="78 130 260 140" height="64" width="64" xml:space="preserve" id="svg2" version="1.1"><metadata id="metadata8"><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/></cc:Work></rdf:RDF></metadata><defs id="defs6"/><g transform="matrix(1.3333333,0,0,-1.3333333,0,400)" id="g10"><g transform="translate(178.0626,235.0086)" id="g12"><path id="path14" style="fill:#4dba87;fill-opacity:1;fill-rule:nonzero;stroke:none" d="M 0,0 -22.669,-39.264 -45.338,0 h -75.491 L -22.669,-170.017 75.491,0 Z"/></g><g transform="translate(178.0626,235.0086)" id="g16"><path id="path18" style="fill:#435466;fill-opacity:1;fill-rule:nonzero;stroke:none" d="M 0,0 -22.669,-39.264 -45.338,0 H -81.565 L -22.669,-102.01 36.227,0 Z"/></g></g></svg>'), auto;
}
</style>
