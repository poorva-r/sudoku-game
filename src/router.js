import { createRouter, createWebHistory } from "vue-router";
import StartScreen from "./components/StartScreen.vue";
import GameScreen from "./components/GameScreen.vue";

const routes = [
  { path: "/", component: StartScreen },
  { path: "/game", component: GameScreen },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
