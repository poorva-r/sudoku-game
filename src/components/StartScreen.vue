<template>
  <div>
    <div>Start Screen</div>
    <button @click="startGame">Start Game</button>
  </div>
</template>
<script>
export default {
  name: "StartScreen",
  methods: {
    startGame() {
      this.$router.push("/game");
    },
  },
};
</script>
