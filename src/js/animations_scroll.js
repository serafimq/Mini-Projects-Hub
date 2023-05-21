const boxes = document.querySelectorAll('.box');

const checkBoxes = () => {
  const trigger = (window.innerHeight / 5) * 4;

  for (const box of boxes) {
    const topOfBox = box.getBoundingClientRect().top;
    if (topOfBox < trigger) {
      box.classList.add('show')
    }
    if (topOfBox > trigger) {
      box.classList.remove('show')
    }
  }
}

checkBoxes();

window.addEventListener('scroll', checkBoxes);
