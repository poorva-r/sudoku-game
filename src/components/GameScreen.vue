<template>
  <div class="bg-background h-screen flex flex-col items-center justify-center">
    <div
      class="grid grid-cols-9 border-2 md:border-4 border-white text-text text-2xl md:text-3xl"
    >
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
            v-model.number="board[rowIndex][cellIndex]"
            class="w-full h-full items-center text-center text-yellow-400 bg-black"
            type="numeric"
            inputmode="numeric"
            maxlength="1"
            pattern="[1-9]"
            min="1"
            max="9"
            :placeholder="cell === 0 ? '' : cell"
          />
          <span v-else class="pointer-events-none">
            {{ cell }}
          </span>
        </div>
      </div>
    </div>
    <div class="flex flex-row gap-10">
    <button
      @click="checkSolution"
      class="font-body mt-8 font-bold text-background text-2xl flex justify-center gap-2 items-center mx-auto shadow-xl bg-primary backdrop-blur-md isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FFFFFF] hover:text-background before:-z-10 before:aspect-square before:hover:scale-200 before:hover:duration-500 relative z-10 px-8 py-2 overflow-hidden border-2 rounded-full group"
    >
      Finish
    </button>
      <button
      @click="resetBoard"
      class="font-body mt-8 font-bold text-background text-2xl flex justify-center gap-2 items-center mx-auto shadow-xl bg-primary backdrop-blur-md isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FFFFFF] hover:text-background before:-z-10 before:aspect-square before:hover:scale-200 before:hover:duration-500 relative z-10 px-8 py-2 overflow-hidden border-2 rounded-full group"
    >
      Clear
    </button>
    <div class="text-background font-body font-bold text-2xl mt-8 bg-primary px-8 py-2 border-2 border-gray-50 rounded-full">
      Timer: {{ formatTime(timer) }}
    </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "GameScreen",
  data() {
    return {
      timer: 0,
      intervalId: null,
      // static sudoku board
      board: [
        [, 3, 5, 2, 6, 9, 7, 8, 1],
        [6, , 2, 5, 7, 1, 4, 9, 3],
        [1, 9, 7, 8, 3, 4, 5, 6, 2],
        [8, 2, 6, 1, , 5, 3, 4, 7],
        [3, 7, 4, 6, 8, 2, 9, 1, 5],
        [9, 5, 1, 7, 4, 3, 6, 2, 8],
        [5, 1, , 3, 2, 6, 8, 7, 4],
        [2, 4, 8, 9, 5, 7, , 3, 6],
        [7, 6, 3, 4, 1, 8, 2, , 9],
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
  mounted() {
    this.startTimer();
  },
  methods: {
    // checks if the cell was originally 0, or editable
    isEditable(rowIndex, cellIndex) {
      return this.originalBoard[rowIndex][cellIndex] === 0;
    },
    startTimer() { 
      this.timer = 0;
      this.intervalId = setInterval(()=> {
        this.timer++;
      },1000);
    },
    stopTimer() { 
      clearInterval(this.intervalId);
      this.intervalId = null;
    },
    formatTime(seconds) {
      const mins = Math.floor(seconds/60).toString().padStart(2, '0');
      const secs = (seconds % 60).toString().padStart(2, '0');
      return `${mins}:${secs}`; 
        },
    resetBoard() {
      this.board = this.originalBoard.map(row => row.map(cell => (cell === 0? undefined :cell)));
    },
    updateCellValue(rowIndex, cellIndex, value) {
      this.board[rowIndex][cellIndex] = value === "" ? 0 : Number(value);
    },
    checkSolution() {
      const correctSolution = [
        [4, 3, 5, 2, 6, 9, 7, 8, 1],
        [6, 8, 2, 5, 7, 1, 4, 9, 3],
        [1, 9, 7, 8, 3, 4, 5, 6, 2],
        [8, 2, 6, 1, 9, 5, 3, 4, 7],
        [3, 7, 4, 6, 8, 2, 9, 1, 5],
        [9, 5, 1, 7, 4, 3, 6, 2, 8],
        [5, 1, 9, 3, 2, 6, 8, 7, 4],
        [2, 4, 8, 9, 5, 7, 1, 3, 6],
        [7, 6, 3, 4, 1, 8, 2, 5, 9],
      ];
      let isCorrect = true;

      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (this.board[i][j] !== correctSolution[i][j]) {
            isCorrect = false;
            console.log(
              "Incorrect cell at",
              i,
              j,
              "expected",
              correctSolution[i][j],
              "but got",
              this.board[i][j]
            );
            break;
          }
        }
      }
      if (isCorrect) {
        this.stopTimer();
        alert("You win!");
      } else {
        alert("Please try again!");
      }
    },
  },
};
</script>
