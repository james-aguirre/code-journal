const $image = document.getElementById('img');
const $photo = document.getElementById('img-placeholder');
$image.addEventListener('input', function (event) {
  $photo.setAttribute('src', event.target.value);
}
);

const $form = document.getElementById('form');

document.addEventListener('submit', function (event) {
  event.preventDefault();
  const messageData = {};
  messageData.entryId = data.nextEntryId;
  data.nextEntryId++;
  messageData.title = $form.title.value;
  messageData.img = $form.img.value;
  messageData.notes = $form.notes.value;
  data.entries.push(messageData);
  $photo.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}
);
