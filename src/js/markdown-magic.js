const markdown_wrapper = document.getElementById('markdown_wrapper');
const source = document.getElementById('source');
const divider = document.getElementById('divider');
const preview = document.getElementById('preview');

source.addEventListener('keyup', () => {
  const newText = marked.parse(source.value)
  preview.innerHTML = newText;
})

const onMouseMove = (event) => {
  const {left, width } = markdown_wrapper.getBoundingClientRect();
  const { clientX } = event;

  source.style.width = `${clientX - left}px`;
  preview.style.width = `${width + left - clientX}px`;
}

const onMouseUp = () => {
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
}

const onMouseDown = () => {
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

divider.addEventListener('mousedown', onMouseDown);
