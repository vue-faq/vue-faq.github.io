webpackJsonp([1],{0:function(e,t,n){e.exports=n("NHnr")},"7zck":function(e,t){},"9v29":function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("/5sW"),i=n("3EgV"),s=n.n(i),r=(n("7zck"),n("VjuZ"),n("MfeA"),n("Biqn")),o=n.n(r),u=(n("SldL"),n("7hDC")),c=n.n(u),l=n("Sazm"),f=n.n(l),p=(n("3VHS"),{apiKey:"AIzaSyCOmVkbb3dMRN4kH-oJJfF0XoDXPkmTcxY",authDomain:"vue-faq-fb452.firebaseapp.com",databaseURL:"https://vue-faq-fb452.firebaseio.com",projectId:"vue-faq-fb452",storageBucket:"vue-faq-fb452.appspot.com",messagingSenderId:"372071045025"});f.a.initializeApp(p);var h=f.a.firestore(),g=(f.a,n("kZVF"),n("a7xT")),v=n.n(g),d=n("+Uzz"),m=function(){return{w:window.innerWidth,h:window.innerHeight}},y={data:function(){return{kek:0}},mounted:function(){var e=new d["TimelineLite"];e.to(".vue-flying-logo img",4,{x:m().w-126,repeat:-1,yoyo:!0,ease:"Linear.easeNone"}).to(".vue-flying-logo img",6,{y:m().h-106,repeat:-1,yoyo:!0,ease:"Linear.easeNone"},0)},render:function(e){return e("div",{class:{"vue-flying-logo":!0}},[e("img",{attrs:{src:v.a}})])}},q={components:{fv:y},data:function(){return{questions:[],query:"",page:1,perPage:10,"α":0}},created:function(){var e=c()(regeneratorRuntime.mark(function e(){var t,n,a=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=h.collection("questions"),e.next=3,t.get();case 3:n=e.sent,n.forEach(function(e){var t=o()({},e.data(),{id:e.id});a.questions.push(t)});case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),computed:{qorp:function(){return this.query.length>0?this.qSearched:this.paginated()},qSearched:function(){var e=this;return this.query.length>0?this.questions.slice().filter(function(t){return t.question.toLowerCase().match(e.query.toLowerCase())}):this.questions},totalPages:function(){return Math.ceil(this.questions.length/this.perPage)}},methods:{paginated:function(){this.page>=this.totalPages&&(this.page=this.totalPages);var e=this.page*this.perPage-this.perPage,t=this.questions.slice(e,this.perPage+e);return t},clickable:function(e){var t=/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?)/gi;return e.toString().replace(t,'<a href="$1" target="_blank">$1</a>')},"γ":function(){this.α>=10?this.α=10:this.α+=1}}},x=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[e.questions.length&&e.α>=10?n("fv"):e._e(),n("v-container",{staticClass:"zindex",attrs:{fluid:""}},[e.questions.length?n("v-layout",{attrs:{"justify-center":""}},[n("v-flex",{attrs:{xs12:"",sm6:"",lg5:""}},[n("h1",{staticClass:"head__title",on:{click:function(t){e.γ()}}},[n("span",[e._v("Vue FAQ")])]),n("v-layout",{attrs:{"justify-center":""}},[n("a",{staticClass:"pray",attrs:{href:"https://vuejs.org/v2/guide/",title:"vue doc"}},[e._v("🙏🏻 Official Vue.js Documentation 🙏🏻")])]),n("v-layout",{attrs:{"justify-center":""}},[n("v-flex",[n("v-select",{staticClass:"select-quests",attrs:{label:"Количество ответов на странице",items:[2,5,10,25,50,100],"hide-details":""},model:{value:e.perPage,callback:function(t){e.perPage=t},expression:"perPage"}}),n("v-text-field",{staticClass:"search",attrs:{label:"Поиск тупых вопросов","prepend-icon":"search","hide-details":""},model:{value:e.query,callback:function(t){e.query=t},expression:"query"}})],1)],1),e._l(e.qorp,function(t,a){return n("v-card",{key:t.id,staticClass:"question"},[n("span",{staticClass:"cq",domProps:{innerHTML:e._s(t.question)}}),n("span",{staticClass:"ca",domProps:{innerHTML:e._s(e.clickable(t.answer))}})])}),n("v-layout",[n("v-flex",{staticClass:"text-xs-center",attrs:{xs10:""}},[n("v-pagination",{attrs:{length:e.totalPages},model:{value:e.page,callback:function(t){e.page=t},expression:"page"}})],1)],1)],2)],1):n("v-layout",[n("v-alert",{attrs:{outline:"",color:"info",icon:"info",value:!0}},[e._v("Грузим вопросы...")])],1)],1)],1)},b=[],k=n("XyMi");function w(e){n("Xvz5"),n("9v29")}var P=!1,_=w,C="data-v-503dfde6",z=null,j=Object(k["a"])(q,x,b,P,_,C,z),L=j.exports;window.Vue=a["a"],a["a"].use(s.a,{theme:{primary:"#40B181"}}),a["a"].config.productionTip=!1,new a["a"]({render:function(e){return e(L)}}).$mount("#app")},Xvz5:function(e,t){},a7xT:function(e,t,n){e.exports=n.p+"img/vuelogo.47236f43.svg"},kZVF:function(e,t){}},[0]);
//# sourceMappingURL=app.688d2a0e.js.map