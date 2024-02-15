/**
 * ?addBook => Create a New Book Instance
 */
const addBook = () => {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const years = document.getElementById('years');
  const status = document.getElementById('isComplete');
  
  // ?Validation => Ensure that each field of Book Details is not Empty
  if (!title.value){
    alert("Title cannot be empty!");
    return;
  }
  if (title.value.length > 15) {
    alert("Book title can't be longer than 15 characters.");
    return;
  }
  if (!author.value) {
    alert("Author cannot be empty!");
    return;
  }
  if (!years.value){
    alert("Years cannot be empty!");
    return;
  }

  // ?Create a new Book Instance
  const newBook = generateBook({
    title: title.value,
    author: author.value,
    years: parseInt(years.value),
    status: status.checked
  });

  // ?Push Created Book to the collection
  BookCollection.push(newBook);

  // ?Trigger a custom event to Render Display of Book Collection
  document.dispatchEvent(new Event(RENDER_EVENT));

  // ?Save Book Collection into Web Storage (localStorage)
  saveBook();

  // ?Clear input field
  title.value = '';
  author.value = '';
  years.value = '';
  status.checked = false;
}

/**
 * ?removeBook => remove one of the Book based on its ID
 * @param {string} bookID => ID of book that will be removed
 */
const removeBook = (bookID) => {
  // ?Find Index of target Book
  const bookTarget = BookCollection.findIndex(book => book.id === bookID);

  // ?Delete the Book from collection
  if (bookTarget !== -1){
    BookCollection.splice(bookTarget, 1);
  }
  document.dispatchEvent(new Event(RENDER_EVENT));
  alert("A Book has been deleted!");
  saveBook();
}

/**
 * ?moveBook => Move a book between Unread and Read Shelf
 * @param {string} bookID => ID of the Book that will be moved between Unread and Read Shelf
 */
const moveBook = (bookID) => {
  const bookTarget = BookCollection.findIndex(book => book.id === bookID);

  if (bookTarget !== -1){
    BookCollection[bookTarget].status = !BookCollection[bookTarget].status
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveBook();
}

/**
 * ?saveBook => save Book Collection to Web Storage
 */
const saveBook = () => {
  localStorage.setItem(KEY, JSON.stringify(BookCollection));
}

/**
 * ?loadBook => load Book Collection from Web Storage and fill the Book Collection Array for the session
 */
const loadBook = () => {
  const loadedBook = JSON.parse(localStorage.getItem(KEY));
  loadedBook.forEach(book => {
    BookCollection.push(book);
  });

  document.dispatchEvent(new Event(RENDER_EVENT));

}

/**
 * ?showDeleteDialog => display dialog for confirmation of deletion
 * @param {string} bookID => remove one of the Book based on its ID
 * @returns nothing or proceed to delete the book if true
 */
const showDeleteDialog = (bookID) => {
  const confirmDelete = confirm("Are you sure you want to delete this book?");
  if (confirmDelete) {
    removeBook(bookID);
  } else {
    return;
  }
}

/**
 * ?searchBook => Find a certain book by any of its property
 * ?findBy => - ID => by its ID
 * @param {number} bookID => ID of targeted book
 * ?          - Title => by its Title
 * @param {string} bookTitle => Title of targeted book
 * ?          - Author => by its Author
 * @param {string} bookAuthor => Author of targeted book
 * ?          - Years => by its publish Years
 * @param {number} bookYears => Publish Years of targeted book
 */
const searchBook = () => {
  const book = document.getElementById('search');
  const bookProp = book.value;

  if (!bookProp){
    alert('Invalid Search!');
    return;
  }

  const filter = document.getElementById('filterOpt');
  const filterOpt = filter.value;
  
  if (filterOpt === 'id') {
    if (!isNaN(bookProp)) {
      const idProp = parseInt(bookProp);
      findByID(idProp);
    } else {
      alert("Invalid ID! Please enter a valid number.");
    }
  } else if (filterOpt === 'title') {
    findByTitle(bookProp);
  } else if (filterOpt === 'author') {
    findByAuthor(bookProp);
  } else if (filterOpt === 'years') {
    if (!isNaN(bookProp)) {
      const yearsProp = parseInt(bookProp);
      findByYears(yearsProp);
    } else {
      alert("Invalid Years! Please enter a valid number.");
    }
  }
}

const findByID = (bookID) => {
  const filteredBook = JSON.parse(localStorage.getItem(KEY)).filter(book => {
    return book.id === bookID;
  });

  // ? clear the array
  FilteredCollection.length = 0;

  filteredBook.forEach(book => {
    FilteredCollection.push(book);
  });

  document.dispatchEvent(new Event(RENDER_EVENT));
}

const findByTitle = (bookTitle) => {
  const filteredBook = JSON.parse(localStorage.getItem(KEY)).filter(book => {
    return book.title === bookTitle;
  });

  // ? clear the array
  FilteredCollection.length = 0;

  filteredBook.forEach(book => {
    FilteredCollection.push(book);
  });

  document.dispatchEvent(new Event(RENDER_EVENT));
};

const findByAuthor = (bookAuthor) => {
  const filteredBook = JSON.parse(localStorage.getItem(KEY)).filter(book => {
    return book.author === bookAuthor;
  });

  // ? clear the array
  FilteredCollection.length = 0;

  filteredBook.forEach(book => {
    FilteredCollection.push(book);
  });

  document.dispatchEvent(new Event(RENDER_EVENT));
};

const findByYears = (bookYears) => {
  const filteredBook = JSON.parse(localStorage.getItem(KEY)).filter(book => {
    return book.years === bookYears;
  });

  // ? clear the array
  FilteredCollection.length = 0;

  filteredBook.forEach(book => {
    FilteredCollection.push(book);
  });

  document.dispatchEvent(new Event(RENDER_EVENT));
};


const clearFilter = () => {
  const book = document.getElementById('search');
  book.value = '';

  FilteredCollection.length = 0;
  BookCollection.length = 0;

  loadBook();

  document.dispatchEvent(new Event(RENDER_EVENT));

}