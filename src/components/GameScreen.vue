<template>
  <div class="bg-background h-screen flex flex-col items-center justify-center">
    <div class="grid grid-cols-9 border-4 border-white text-text text-3xl">
      <div v-for="(row, rowIndex) in board" :key="rowIndex">
        <div
          v-for="(cell, cellIndex) in row"
          :key="cellIndex"
          :class="[
            'w-16 h-16 gap-4 flex items-center justify-center border border-white',
            (rowIndex % 3 === 0) & (rowIndex !== 0) ? 'border-l-4' : '',
            (cellIndex % 3 === 0) & (cellIndex !== 0) ? 'border-t-4' : '',
          ]"
        >
          {{ cell !== 0 ? cell : "" }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "GameScreen",
  data() {
    return {
      // static sudoku board
      board: [
        [0, 3, 5, 2, 6, 9, 7, 8, 1],
        [6, 0, 2, 5, 7, 1, 4, 9, 3],
        [1, 9, 7, 8, 3, 4, 5, 6, 2],
        [8, 2, 6, 1, 0, 5, 3, 4, 7],
        [3, 7, 4, 6, 8, 2, 9, 1, 5],
        [9, 5, 1, 7, 4, 3, 6, 2, 8],
        [5, 1, 0, 3, 2, 6, 8, 7, 4],
        [2, 4, 8, 9, 5, 7, 0, 3, 6],
        [7, 6, 3, 4, 1, 8, 2, 0, 9],
      ],
    };
  },
};
</script>
