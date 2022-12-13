import Vue from "vue";
import VueRouter from "vue-router";

import TheMap from "@/views/TheMap.vue";
Vue.use(VueRouter);

// TODO Web Template Studio: Add routes for your new pages here.
export default new VueRouter({
    mode: "history",
    routes: [
        { path: "/", component: TheMap },
        // { path: "/map", component: TheMap },
        // { path: "/ind", component: Industry },
        // { path: "/review/:id/:name", sensitive: false, component: Review },
    ]
});
