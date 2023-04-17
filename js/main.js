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
const $deleteButton = document.querySelector('.delete-button');
const $formHeader = document.querySelector('.entry-header');
const $modal = document.querySelector('.modal');
const $modalCancel = document.querySelector('.modal-cancel');
const $modalConfirm = document.querySelector('.modal-confirm');
const $body = document.querySelector('.light');
const $title = document.querySelector('#title');
const $img = document.querySelector('#img');
const $notes = document.querySelector('#notes');
const $headerNewEntry = document.querySelector('.entry-header');
const $saveDeleteButtons = document.querySelector('.row-2');

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
    // updated code below
    $list.prepend(renderEntry(messageData));
    $form.reset();
    viewSwap('entries');
    toggleNoEntries();

    // 3rd edit below, this is to fill out form template save edit information on submit
    // This is to replace pre exisiting entry in entries array with edited version && load it into the dom tree without refreshing page
  } else {

    messageData.entryId = data.editing.entryId;
    messageData.title = event.target.elements.title.value;
    messageData.img = event.target.elements.img.value;
    messageData.notes = event.target.elements.notes.value;

    // this variable is to match the objects entryId with its corresponding index in the entries array index
    const dataEntryIndex = data.entries.length - data.editing.entryId;
    data.entries[dataEntryIndex] = messageData;

    for (let i = 0; i < $list.childNodes.length; i++) {
      if ($list.childNodes[i].tagName === 'LI' && $list.childNodes[i].dataset.entryId * 1 === data.editing.entryId) {
        $list.childNodes[i].replaceWith(renderEntry(messageData));
      }
    }
    $form.reset();
    viewSwap('entries');
    $formHeader.textContent = 'New entry';
    data.editing = null;
  }
  $deleteButton.classList.add('hidden');
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

// to create all entries from the pre built dom tree
document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    $list.appendChild(renderEntry(data.entries[i]));
  }
  viewSwap('entries');
  toggleNoEntries();
}
);

// to toggle no entries text if entries array is null
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

// button for new entry form
$anchorTagTwo.addEventListener('click', function () {
  $deleteButton.classList.add('hidden');
  $saveDeleteButtons.classList.add('single-button');
  viewSwap('entry-form');
}
);

// modal open function
$deleteButton.addEventListener('click', function (event) {
  $modal.classList.remove('hidden');
}
);

// close the modal
$modalCancel.addEventListener('click', function (event) {
  $modal.classList.add('hidden');
  $body.classList.remove('dark');
  $title.classList.remove('inputs-dark');
  $img.classList.remove('inputs-dark');
  $notes.classList.remove('inputs-dark');
}
);

// to delete entry from modal button
$modalConfirm.addEventListener('click', function (event) {
  // to match entries index in data.entries with its corresponding entryId
  const dataEntryIndex = data.entries.length - data.editing.entryId;
  data.entries.splice(dataEntryIndex, 1);
  // simple for loop to match up corresponding LI element with current entry
  for (let i = 0; i < $list.childNodes.length; i++) {
    if ($list.childNodes[i].tagName === 'LI' && $list.childNodes[i].dataset.entryId * 1 === data.editing.entryId) {
      const deleted = $list.childNodes[i];
      $list.removeChild(deleted);
    }
  }
  toggleNoEntries();
  $modal.classList.add('hidden');
  viewSwap('entries');
}
);
// this function is to stay on same page during refresh as well as swap views without reloading page
function viewSwap(string) {
  if (string === 'entries') {
    $entries.classList.remove('hidden');
    $entryForm.classList.add('hidden');
    data.view = string;
  } else {
    $entries.classList.add('hidden');
    $entryForm.classList.remove('hidden');
    data.view = string;
  }
}

// This is to swap views if icon is clicked
$list.addEventListener('click', function () {
  if (event.target.tagName === 'I') {
    // in quotes + brackets to grab the nearest element with data-entry-id attribute
    let entryId = event.target.closest('[data-entry-id]').dataset.entryId;
    entryId = entryId * 1;
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === entryId) {
        data.editing = data.entries[i];
      }
    }
  }
  $headerNewEntry.innerHTML = 'Edit Entry';
  $title.value = data.editing.title;
  $img.value = data.editing.img;
  $notes.innerHTML = data.editing.notes;
  $deleteButton.classList.remove('hidden');
  $saveDeleteButtons.classList.remove('single-button');
  viewSwap('entry-form');
}
);
