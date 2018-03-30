<template lang="pug">
v-app
  v-container(fluid)
    v-layout(v-if="!Object.keys(questions).length")
      v-alert(outline color="info" icon="info" :value="true") Грузим вопросы...
    v-layout(v-else justify-center)
      v-flex(xs12 sm6 lg5)
        h1(class="head__title") Vue FAQ
        v-text-field(
          v-model="query"
          label="Поиск"
          prepend-icon="search"
          class="search")
        v-card(class="question" v-for="(q, i) in questionsC" :key="i")
          span(v-html="q.question" class="cq")
          span(v-html="q.answer" class="ca")
</template>

<script>
import { db } from './fb';
import toArray from 'lodash/toArray';

export default {
  data() {
    return {
      questions: {},
      query: '',
    };
  },
  async created() {
    const qc = db.collection('questions');
    const qs = await qc.get();
    qs.forEach(q => Vue.set(this.questions, q.id, { ...q.data(), id: q.id }));
  },
  computed: {
    questionsC() {
      const arr = toArray(this.questions);
      if (this.query.length > 0) {
        return arr.slice().filter(x => x.question.toLowerCase().match(this.query.toLowerCase()));
      }
      return this.questions;
    },
  },
};
</script>

<style scoped lang="stylus">
vue = #40B181
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
    
</style>
