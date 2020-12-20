const Vue = require("vue");
const App = require("./App.vue");

Vue.config.productionTip = false;

new Vue({
   render: h => h(App),
}).$mount("#app");