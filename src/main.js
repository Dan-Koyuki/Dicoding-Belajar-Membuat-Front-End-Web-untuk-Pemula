document.addEventListener('DOMContentLoaded', function () {
  const bookForm = document.getElementById('book-form');
  console.log(bookForm);
  bookForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();
  });

  if (isStorageExist()) {
    loadBook();
  }
});

const RENDER_EVENT = 'render-book';

document.addEventListener(RENDER_EVENT, function () {
  console.log(booksCollection);
});

document.dispatchEvent(new Event(RENDER_EVENT));

