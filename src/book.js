const booksCollection = [];
const KEY = "MY_BOOK";

const generateBook = (config) => {
  const newBook = {
    id: +new Date(),
    title: config.title,
    author: config.author,
    years: config.years,
    status: config.status
  }

  return newBook;
}

const saveBook = () => {
  localStorage.setItem(KEY, JSON.stringify(booksCollection));
}

const loadBook = () => {
  return booksCollection = JSON.parse(localStorage.getItem(KEY));
}

function isStorageExist() {
  if (typeof (Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}

const searchBook = () => {
  
}