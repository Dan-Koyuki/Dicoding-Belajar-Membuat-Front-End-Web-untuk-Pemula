/**
 * ?Variable Declaration
 * @var {array} BookCollection => Main Array to store Books
 * @var {array} FilteredCollection => Secondary Array to store Filtered Book from Search Feature, will work as long as the Clear Button not clicked
 * @var {string} KEY => KEY to store or load Book Collection to or from Web Storage
 * @var {string} RENDER_EVENT => custom event
 */
const BookCollection = [];
const FilteredCollection = [];
const KEY = "MY_BOOK_COLLECTION"
const RENDER_EVENT = 'render-book';

/**
 * @param {object} config => Prototype object of book
 * @returns new instance of Book
 */
const generateBook = (config) => {
  const newBook = {
    id: +new Date(),
    title: config.title,
    author: config.author,
    year: config.year,
    isComplete: config.isComplete
  }

  return newBook;
}

/**
 * @returns true if Browser have web storage feature, else false
 */
const isStorageExist = () => {
  if (typeof (Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}

/**
 * 
 * @param {object} book
 * @returns details layout for a book
 */
const createElement = (book) => {
  // Book Details
  const textID = document.createElement('p');
  textID.classList.add('book-id');
  textID.innerText = book.id;

  const textTitle = document.createElement('p');
  textTitle.classList.add('book-title');
  textTitle.innerText = book.title;

  const textAuthor = document.createElement('p');
  textAuthor.classList.add('book-author');
  textAuthor.innerText = book.author;

  const textYears = document.createElement('p');
  textYears.classList.add('book-years');
  textYears.innerText = book.year;
  
  // Container for Book Details
  const detailContainer = document.createElement('div');
  detailContainer.classList.add('shelf-detail');
  detailContainer.append(textID, textTitle, textAuthor, textYears);

  // Button 
  const buttonRemove = document.createElement('button');
  buttonRemove.classList.add('btn-remove');
  buttonRemove.addEventListener('click', () => {
    showDeleteDialog(book.id);
  })
  const buttonMove = document.createElement('button');
  buttonMove.classList.add('btn-move');
  buttonMove.addEventListener('click', () => {
    moveBook(book.id);
  })

  // Container for Button
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('shelf-button');
  buttonContainer.append(buttonMove, buttonRemove);

  // Shelf Item Container
  const container = document.createElement('div');
  container.classList.add('shelf-item')
  container.append(detailContainer, buttonContainer);
  container.setAttribute('id', `${book.id}`);

  return container;
}