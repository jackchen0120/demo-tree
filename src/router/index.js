import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/tree",
    // name: "Home",
    // component: () => import("../views/Home.vue"),
  },
  {
    path: "/tree",
    name: "Tree",
    component: () => import("../components/Tree.vue"),
  },
  {
    path: "/table",
    name: "Table",
    component: () => import("../components/Table.vue"),
  },
  {
    path: "/vxe",
    name: "Vxe",
    component: () => import("../components/VxeTable.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
