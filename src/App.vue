<template lang="pug">
.app
  h1 Vue FAQ
  input(class="search" placeholder="Поиск" v-model="search")
  template(v-for="q in questionsC")
    .block
      span(v-html="q.question" class="title")
      br
      span(v-html="q.answer")
  span(v-if="!Object.keys(questions).length") Грузим вопросы...
</template>

<script>
import { db } from './fb';
import toArray from 'lodash/toArray';

export default {
  async created() {
    const qc = db.collection('questions');
    const qs = await qc.get();
    qs.forEach(q => Vue.set(this.questions, q.id, { ...q.data(), id: q.id }));
  },
  data() {
    return {
      questions: {},
      search: '',
    };
  },
  components: {},
  computed: {
    questionsC() {
      const arr = toArray(this.questions);
      if (this.search.length > 0) {
        return arr.slice().filter(x => x.question.toLowerCase().match(this.search.toLowerCase()));
      }
      return this.questions;
    },
  },
};
</script>

<style scoped lang="stylus">
vue = #40B181
.app
  font-family 'open sans', 'roboto', 'helvetica'
  display flex
  flex-flow column
  justify-content flex-start
  text-align left
  max-width 768px
  margin 0 auto
  h1
    font-size 40px
    color vue
    text-align center
    line-height 20px
  .block
    box-shadow 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)
    padding 1rem
    margin-bottom 1rem
    > .title
      font-size 20px
      font-weight 500
  .search
    padding .5rem
    margin-bottom 1rem
</style>
