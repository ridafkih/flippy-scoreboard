const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));

const flipFlipper = async (flipper, flipperTextValue) => {
  const [base, flipped] = flipper.children;
  flipped.textContent = flipperTextValue;
  flipper.classList.add("flipping");
  await wait(2000);

  base.textContent = flipperTextValue;
  flipper.classList.remove("flipping");
  void flipper.offsetWidth;
};

const flipAllFlippers = async (newNumber) => {
  const flippers = [...document.querySelectorAll(".flippy")];
  const chars = [...newNumber.toString().padStart(4, "0")];

  const flips = flippers.map((flipper, index) => {
    const { textContent: currentChar } = flipper.children[0];
    if (currentChar === chars[index]) return () => {};
    return flipFlipper(flipper, chars[index]);
  });

  return Promise.all(flips);
};

const incrementNumberRecursively = async (value = 0) => {
  await flipAllFlippers(value);
  value += Math.floor(Math.random() * 9) + 1;

  const timeout = Math.random() * 2000 + 1000;
  const nextValue = value <= 9999 ? value : value - 9999;

  setTimeout(incrementNumberRecursively, timeout, nextValue);
};

incrementNumberRecursively();
