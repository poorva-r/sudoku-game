<template>
  <div class="bg-background h-screen flex flex-col items-center justify-center">
    <div class="grid grid-cols-9 border-2 md:border-4 border-white text-text text-2xl md:text-3xl">
      <div v-for="(row, rowIndex) in board" :key="rowIndex">
        <div
          v-for="(cell, cellIndex) in row"
          :key="cellIndex"
          :class="[
            'w-10 h-10 md:w-16 md:h-16 gap-4 flex items-center justify-center border border-white',
            (rowIndex % 3 === 0) & (rowIndex !== 0) ? 'border-l-4' : '',
            (cellIndex % 3 === 0) & (cellIndex !== 0) ? 'border-t-4' : '',
          ]"
        >
          <input
            v-if="isEditable(rowIndex, cellIndex)"
            v-model="board[rowIndex][cellIndex]"
            class="w-full h-full items-center text-center text-primary bg-black"
            type="numeric"
            inputmode="numeric"
            maxlength="1"
            pattern="[1-9]"
            min="1"
            max="9"
            :placeholder="cell === 0 ? '' : cell"
            @input="updateCellValue(rowIndex, cellIndex, $event.target.value)"
          />
          <span v-else class="pointer-events-none">
            {{ cell }}
          </span>
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
        [ , 3, 5, 2, 6, 9, 7, 8, 1],
        [6,  , 2, 5, 7, 1, 4, 9, 3],
        [1, 9, 7, 8, 3, 4, 5, 6, 2],
        [8, 2, 6, 1,  , 5, 3, 4, 7],
        [3, 7, 4, 6, 8, 2, 9, 1, 5],
        [9, 5, 1, 7, 4, 3, 6, 2, 8],
        [5, 1,  , 3, 2, 6, 8, 7, 4],
        [2, 4, 8, 9, 5, 7,  , 3, 6],
        [7, 6, 3, 4, 1, 8, 2,  , 9],
      ],
      // to track original state of the board
      originalBoard: [
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
  methods: {
    // checks if the cell was originally 0, or editable
    isEditable(rowIndex, cellIndex) {
      return this.originalBoard[rowIndex][cellIndex] === 0;
    },
    updateCellValue(rowIndex, cellIndex, value) {
      this.$set(this.board[rowIndex], cellIndex, value === "" ? 0 : value);
    },
  },
};
</script>
