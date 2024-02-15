const addBook = () => {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const years = document.getElementById('years');
  const status = document.getElementById('isComplete');
  
  // Validation
  if (!title.value){
    alert("Title cannot be empty!");
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

  // Create new Book Instance
  const newBook = generateBook({
    title: title.value,
    author: author.value,
    years: years.value,
    status: status.checked
  });

  // Push Created Book to the collection
  booksCollection.push(newBook);

  // Clear input field
  title.value = '';
  author.value = '';
  years.value = '';
  status.checked = false;

  saveBook();
  const testing = localStorage.getItem('MY_BOOK');
  console.log(testing);
}