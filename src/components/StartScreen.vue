<template>
  <div class="bg-background h-screen flex flex-col items-center justify-center">
    <div class="font-heading text-text text-4xl mb-10">Sudoku</div>
    <button
      @click="startGame"
      class="font-body font-bold text-background text-2xl flex justify-center gap-2 items-center mx-auto shadow-xl bg-primary backdrop-blur-md isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FFFFFF] hover:text-background before:-z-10 before:aspect-square before:hover:scale-200 before:hover:duration-500 relative z-10 px-8 py-2 overflow-hidden border-2 rounded-full group"
      type="submit"
    >
      Start
    </button>
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
