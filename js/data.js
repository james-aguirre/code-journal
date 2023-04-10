/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  const jSon = JSON.stringify(data);
  this.localStorage.setItem('javascript-local-storage', jSon);
}
);

if (localStorage !== null) {
  data = JSON.parse('javascript-local-storage');
}
