const $image = document.getElementById('img');
const $photo = document.getElementById('img-placeholder');
$image.addEventListener('input', function (event) {
  $photo.setAttribute('src', event.target.value);
}
);

const $form = document.querySelector('#form');

$form.addEventListener('submit', function (event) {
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
  // updated code below
  $list.prepend(renderEntry(messageData));
  viewSwap('entries');
  toggleNoEntries();

}
);

function renderEntry(entry) {
  const $li = document.createElement('li');

  const $row = document.createElement('div');
  $row.className = 'row';
  $li.appendChild($row);

  const $columnHalf = document.createElement('div');
  $columnHalf.className = 'column-half';
  $row.appendChild($columnHalf);

  const $img = document.createElement('img');
  $columnHalf.appendChild($img);
  $img.src = entry.img;

  const $columnHalfTwo = document.createElement('div');
  $columnHalfTwo.className = 'column-half';
  $row.appendChild($columnHalfTwo);
  const $header = document.createElement('h1');
  const $p = document.createElement('p');
  $columnHalfTwo.appendChild($header);
  $columnHalfTwo.appendChild($p);

  $header.textContent = entry.title;
  $p.textContent = entry.notes;
  return $li;
}

const $list = document.querySelector('#list');
document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    $list.appendChild(renderEntry(data.entries[i]));
  }
}
);

const $entryForm = document.getElementById('entry-form');
const $entries = document.getElementById('entries');
const $noEntries = document.getElementById('no-entries');

function toggleNoEntries() {
  if (data.entries.length === 0) {
    $noEntries.classList.remove('hidden');
  } else {
    $noEntries.classList.add('hidden');
  }
}

const $anchorTag = document.querySelector('.anchor-tag');
$anchorTag.addEventListener('click', viewSwap('entries'));

const $anchortagTwo = document.querySelector('.new-button');
$anchortagTwo.addEventListener('click', viewSwap('entry-form'));

function viewSwap(string) {
  if (string === 'entries') {
    $entries.classList.remove('hidden');
    $entryForm.classList.add('hidden');
  } else if (string === 'entry-form') {
    $entries.classList.add('hidden');
    $entryForm.classList.remove('hidden');
  }
}
