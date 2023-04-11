const $image = document.getElementById('img');
const $photo = document.getElementById('img-placeholder');
$image.addEventListener('input', function (event) {
  $photo.setAttribute('src', event.target.value);
}
);

const $form = document.querySelector('#form');

document.addEventListener('submit', function (event) {
  event.preventDefault();
  const messageData = {};
  messageData.entryId = data.nextEntryId;
  data.nextEntryId++;
  messageData.title = event.target.elements.title.value;
  messageData.img = event.target.elements.img.value;
  messageData.notes = event.target.elements.notes.value;
  data.entries.unshift(messageData);
  $photo.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}
);
