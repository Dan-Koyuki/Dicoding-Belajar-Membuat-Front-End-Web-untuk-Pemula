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

  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    searchBook();
  })

  const clearButton = document.getElementById('clearButton');
  clearButton.addEventListener('click', (event) => {
    event.preventDefault();
    clearFilter();
  })
});

document.addEventListener(RENDER_EVENT, function () {
  const unreadBookList = document.getElementById('bookshelf1');
  unreadBookList.innerHTML = '';

  const readBookList = document.getElementById('bookshelf2');
  readBookList.innerHTML = '';

  const searchField = document.getElementById('search');
  if (searchField.value) {
    FilteredCollection.forEach(book => {
      const bookElement = createElement(book);
      if (book.status){
        readBookList.append(bookElement);
      } else {
        unreadBookList.append(bookElement);
      }
    })
  } else {
    BookCollection.forEach(book => {
      const bookElement = createElement(book);
      if (book.status){
        readBookList.append(bookElement);
      } else {
        unreadBookList.append(bookElement);
      }
    })
  }
});

