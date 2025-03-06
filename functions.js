document.addEventListener("DOMContentLoaded", () => {
  // Variables from my file variables.js
  const columns = {
    "first-column": columnB,
    "second-column": columnI,
    "third-column": columnN,
    "fourth-column": columnG,
    "fifth-column": columnO,
  };

  // Randomise Button: Updates bingo card values from the respective arrays
  document.querySelector(".randomise").addEventListener("click", () => {
    Object.keys(columns).forEach((columnClass) => {
      const columnElements = document.querySelectorAll(`.${columnClass}`);
      const randomValues = getRandomValues(
        columns[columnClass],
        columnElements.length
      );
      columnElements.forEach((element, index) => {
        element.textContent = randomValues[index];
      });
    });

    // Uncheck all checkboxes when randomising
    document.querySelectorAll(".checkbox-wrapper input").forEach((checkbox) => {
      checkbox.checked = false;
    });
  });

  // Clear Button: Unchecks all checkboxes on the bingo card
  document.querySelector(".clear").addEventListener("click", () => {
    document.querySelectorAll(".checkbox-wrapper input").forEach((checkbox) => {
      checkbox.checked = false;
    });
  });

  // Called words list
  const calledWordsList = document.querySelector(".called-words-list");
  const latestCalledWord = document.querySelector(".latest-called-word");
  let calledWords = [];
  const allWords = [...columnB, ...columnI, ...columnN, ...columnG, ...columnO];

  // Updates the textarea with the list of called words (newest on top)
  function updateCalledWordsDisplay() {
    calledWordsList.value = calledWords.join("\n");
  }

  // Updates the counter values
  function updateCounters() {
    document.querySelector(".played-items").textContent = calledWords.length;
    document.querySelector(".total-items").textContent = allWords.length;
  }

  // Picks a new word and updates the list
  function callNewWord() {
    if (calledWords.length === allWords.length) return;

    let newWord;
    do {
      newWord = allWords[Math.floor(Math.random() * allWords.length)];
    } while (calledWords.includes(newWord));

    calledWords.unshift(newWord); // Add new word at the top
    updateCalledWordsDisplay();
    updateCounters();

    // Update and show the latest called word
    latestCalledWord.textContent = newWord;
    latestCalledWord.classList.remove("hidden");
  }

  // Manual Play Button: Calls a new word on each click
  document.querySelector(".manual-call").addEventListener("click", () => {
    callNewWord();
  });

  // Reset Button: Clears the called words and resets the game
  document.querySelector(".reset").addEventListener("click", () => {
    calledWords = []; // Clear the array
    updateCalledWordsDisplay();
    updateCounters();

    // Hide and reset the latest called word
    latestCalledWord.classList.add("hidden");
    latestCalledWord.textContent = "Get ready!";
  });

  // Returns a randomized subset of the given array
  function getRandomValues(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
});

// const fruits = ['apple', 'banana', 'cherry'];
// const randomFruits = getRandomValues(fruits, 2);
// console.log(randomFruits);
