
const $form = document.getElementById('form');

document.addEventListener('submit', function (event) {
  event.preventDefault();
  const messageData = {};
  messageData.title = $form.title.value;
  messageData.img = $form.img.value;
  messageData.notes = $form.notes.value;
  $form.reset();
}
);
