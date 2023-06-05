const fill = document.querySelector('.fill');
const blocks = document.querySelectorAll('.empty')

function dragStart() {
  this.classList.add('hold');
  setTimeout(() => this.classList = 'invisible', 0);
}

function dragEnd() {
  this.classList = 'fill';
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add('hovered');
}

function dragLeave() {
  this.classList.remove('hovered');
}

function dragOver(e) {
  e.preventDefault();
}

function drop() {
  this.classList = 'empty';
  this.append(fill)
}

fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);

for (const block of blocks) {
  block.addEventListener('dragenter', dragEnter);
  block.addEventListener('dragleave', dragLeave);
  block.addEventListener('dragover', dragOver);
  block.addEventListener('drop', drop);
}
