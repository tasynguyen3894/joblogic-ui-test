import { createRouter, type RouteRecordRaw, createWebHistory } from 'vue-router';



const routes: readonly RouteRecordRaw[] = [];

export function createAppRouter() {
  return createRouter({
    history: createWebHistory(),
    routes
  })
}



