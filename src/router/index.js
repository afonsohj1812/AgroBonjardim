import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";

export const routes = [
  { path: "/", name: "home", component: HomeView, meta: { label: "Início" } },
  {
    path: "/produtos",
    name: "products",
    component: () => import("@/views/ProductsView.vue"),
    meta: { label: "Produtos" },
  },
  {
    path: "/quem-somos",
    name: "about",
    component: () => import("@/views/AboutView.vue"),
    meta: { label: "Quem Somos" },
  },
  {
    path: "/parceiros",
    name: "partners",
    component: () => import("@/views/PartnersView.vue"),
    meta: { label: "Marcas" },
  },
  {
    path: "/contactos",
    name: "contact",
    component: () => import("@/views/ContactView.vue"),
    meta: { label: "Contactos" },
  },
];

const categoryRoute = {
  path: "/produtos/:slug",
  name: "category",
  component: () => import("@/views/CategoryView.vue"),
};

export default createRouter({
  history: createWebHistory(),
  routes: [...routes, categoryRoute],
  scrollBehavior: (to) =>
    to.hash ? { el: to.hash, behavior: "smooth" } : { top: 0 },
});
