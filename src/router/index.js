import { createRouter, createWebHistory } from 'vue-router'
import home from './routes/home'
import main from './routes/main'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...home,
    ...main,
  ]
})

export default router
