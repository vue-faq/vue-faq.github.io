<template lang="pug">
v-app
  v-container(fluid)
    v-layout(v-if="!Object.keys(questions).length")
      v-alert(outline color="info" icon="info" :value="true") Грузим вопросы...
    v-layout(v-else justify-center)
      v-flex(xs12 sm6 lg5)
        h1(class="head__title") Vue FAQ 
        v-layout(justify-center)
          v-flex(xs6 lg3 class="text-xs-center")
            v-select(label="Количество ответов на странице" v-model="perPage" :items="[5, 10, 25, 50, 100]")
        a(href="https://vuejs.org/v2/guide/" title="vue doc" class="pray") 🙏🏻 Вот по этой ссылке ваша библия и коран! молитесь на нее днем и ночью, утром и вечером, в радости и печали, в здравии и нездравии.. всегда в общем!
          
        v-text-field(
          v-model="query"
          label="Поиск тупых вопросов"
          prepend-icon="search"
          class="search")
        v-card(class="question" v-for="(q, i) in paginated" :key="i")
          span(v-html="q.question" class="cq")
          span(v-html="clickable(q.answer)" class="ca")
        
        v-layout
          v-flex(xs10 class="text-xs-center")
            v-pagination(v-model="page" :length="paginationLength")
</template>

<script>
import { db } from './fb';
import toArray from 'lodash/toArray';

export default {
  data() {
    return {
      questions: {},
      query: '',
      page: 1,
      perPage: 10,
    };
  },
  async created() {
    const qc = db.collection('questions');
    const qs = await qc.get();
    qs.forEach(q => Vue.set(this.questions, q.id, { ...q.data(), id: q.id }));
  },
  computed: {
    questionsArray() {
      return toArray(this.questions);
    },
    questionsC() {
      if (this.query.length > 0) {
        return this.questionsArray.slice().filter(x => x.question.toLowerCase().match(this.query.toLowerCase()));
      }
      return this.questions;
    },
    paginated() {
      return this.questionsArray
        .slice()
        .splice(this.page, this.perPage);
    },
    paginationLength() {
      return Math.ceil(this.questionsArray.length / this.perPage);
    },
    clickable(text) {
      var regexp = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
      return text.replace(regexp, '<a href="$1" target="_blank">$1</a>');
    },
  },
};
</script>

<style scoped lang="stylus">
vue = #40B181

a
  text-decoration none

#app
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
  &:hover
    color vue
    text-shadow 0 1px vue
    background-color transparent
</style>
