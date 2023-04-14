// global dom variables
const $image = document.getElementById('img');
const $photo = document.getElementById('img-placeholder');
const $form = document.querySelector('#form');
const $list = document.querySelector('#list');
const $entryForm = document.getElementById('entry-form');
const $entries = document.getElementById('entries');
const $noEntries = document.getElementById('no-entries');
const $anchorTag = document.querySelector('.anchor-tag');
const $anchorTagTwo = document.querySelector('.new-button');
const $formHeader = document.querySelector('.entry-header');

$image.addEventListener('input', function (event) {
  $photo.setAttribute('src', event.target.value);
}
);

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  const messageData = {};
  if (data.editing === null) {
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
    $form.reset();
    viewSwap('entries');
    toggleNoEntries();

    // 3rd edit below, this is to fill out form template save edit information on submit
  } else {
    data.editing.title = event.target.elements.title.value;
    data.editing.img = event.target.elements.img.value;
    data.editing.notes = event.target.elements.notes.value;

    for (let i = 0; i < $list.childNodes.length; i++) {
      if ($list.childNodes[i].tagName === 'LI' && $list.childNodes[i].dataset.entryId * 1 === data.editing.entryId) {
        $list.childNodes[i].replaceWith(renderEntry(data.editing));
      }
    }
    $form.reset();
    viewSwap('entries');
    $formHeader.textContent = 'New entry';
    data.editing = null;
  }
}
);

function renderEntry(entry) {
  const $li = document.createElement('li');
  $li.setAttribute('data-entry-id', entry.entryId);

  const $row = document.createElement('div');
  $row.className = 'row-entries';
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
  const $columnHalfTwoHeader = document.createElement('div');
  $columnHalfTwoHeader.className = 'title-edit';
  $columnHalfTwo.appendChild($columnHalfTwoHeader);

  const $header = document.createElement('h3');
  const $fontAwesome = document.createElement('i');
  const $p = document.createElement('p');
  $fontAwesome.className = 'fa-solid fa-pencil';
  $columnHalfTwoHeader.appendChild($header);
  $columnHalfTwoHeader.appendChild($fontAwesome);
  $columnHalfTwo.appendChild($p);

  $header.textContent = entry.title;
  $p.textContent = entry.notes;
  return $li;
}

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    $list.appendChild(renderEntry(data.entries[i]));
  }
  viewSwap(data.view);
  toggleNoEntries();
}
);

function toggleNoEntries() {
  if (data.entries.length === 0) {
    $noEntries.classList.remove('hidden');
  } else {
    $noEntries.classList.add('hidden');
  }
}

$anchorTag.addEventListener('click', function () {
  viewSwap('entries');
}
);

$anchorTagTwo.addEventListener('click', function () {
  viewSwap('entry-form');
  const $notes = document.querySelector('#notes');
  $notes.innerHTML = '';
}
);

function viewSwap(string) {
  if (string === 'entries') {
    $entries.classList.remove('hidden');
    $entryForm.classList.add('hidden');
  } else
  if (string === 'entry-form') {
    $entries.classList.add('hidden');
    $entryForm.classList.remove('hidden');
  }
  data.view = string;
}

// This is to swap pages if icon is clicked
$list.addEventListener('click', function () {
  if (event.target.tagName === 'I') {
    viewSwap('entry-form');
    // in quotes + brackets to grab the nearest element with data-entry-id attribute
    let entryId = event.target.closest('[data-entry-id]').dataset.entryId;
    entryId = entryId * 1;
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === entryId) {
        data.editing = data.entries[i];
      }
    }
  }
  const $title = document.querySelector('#title');
  const $img = document.querySelector('#img');
  const $notes = document.querySelector('#notes');
  const $headerNewEntry = document.querySelector('.entry-header');
  $headerNewEntry.innerHTML = 'Edit Entry';
  $title.value = data.editing.title;
  $img.value = data.editing.img;
  $notes.innerHTML = data.editing.notes;
}
);
