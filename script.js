/**
 * Resolves a promise after a set amount of time.
 * @param {number} time The number of milliseconds to wait.
 * @returns {Promise<void>} A promise that resolves after the set time.
 */
const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));

/**
 * Flips a flipper to reveal a new value.
 * @param {HTMLDivElement} flipper The flipper element to flip.
 * @param {string|number} flipperTextValue The new flipper value.
 * @returns {Promise<void>} A promise that resolves on completion.
 */
const flipFlipper = async (flipper, flipperTextValue) => {
  const [base, flipped] = flipper.children;
  flipped.textContent = flipperTextValue;
  flipper.classList.add("flipping");
  await wait(2000);

  base.textContent = flipperTextValue;
  flipper.classList.remove("flipping");
  void flipper.offsetWidth;
};

/**
 * Flips all the flippers on the scoreboard to reveal a new value.
 * @param {string|number} newNumber The new value for the entire scoreboard.
 * @returns {Promise<void>} A promise that resolves on completion.
 */
const flipAllFlippers = async (newValue) => {
  const flippers = [...document.querySelectorAll(".flippy")];
  const chars = [...newValue.toString().padStart(4, "0")];

  const flips = flippers.map((flipper, index) => {
    const { textContent: currentChar } = flipper.children[0];
    if (currentChar === chars[index]) return () => {};
    return flipFlipper(flipper, chars[index]);
  });

  return Promise.all(flips);
};

/**
 * Recursively calls itself at a random interval to continuously
 * add a random value to the scoreboard.
 * @param {string|value} value The value to set the scoreboard to.
 */
(async function incrementNumberRecursively(value = 0) {
  await flipAllFlippers(value);
  value += Math.floor(Math.random() * 9) + 1;

  const timeout = Math.random() * 2000 + 1000;
  const nextValue = value <= 9999 ? value : value - 9999;

  setTimeout(incrementNumberRecursively, timeout, nextValue);
})();
