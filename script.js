const searchInput = document.getElementById('search');
const submitForm = document.getElementById('submit');
const randomBtn = document.querySelector('.random-btn');
const showAllBtn = document.querySelector('.show-all-btn');
const booksEl = document.getElementById('books');
const resultHeading = document.getElementById('result-heading');
const genreButtons = document.querySelectorAll('.genre-btn');

// Загрузка JSON-данных
async function getBooks() {
  const res = await fetch('books.json');
  const data = await res.json();
  return data.книги;
}

// Функция для отображения книг
function displayBooks(filteredBooks) {
  if (filteredBooks.length === 1) {
    booksEl.classList.add('single-book');
  } else {
    booksEl.classList.remove('single-book');
  }

  booksEl.innerHTML = filteredBooks
    .map(book => `
      <div class="book">
        <img src="${book.обложка}" alt="${book.название}">
        <h3>${book.название}</h3>
        <p><strong>Автор:</strong> ${book.автор}</p>
        <p><strong>Жанр:</strong> ${book.жанр}</p>
        <p>${book.описание}</p>
      </div>
    `)
    .join('');
}

// Показать все книги
async function showAllBooks() {
  const books = await getBooks();
  resultHeading.innerHTML = '<h2>Все книги:</h2>';
  displayBooks(books);
}

// Поиск книг
async function searchBooks(e) {
  e.preventDefault();
  const searchTerm = searchInput.value.toLowerCase();
  const books = await getBooks();
  const filteredBooks = books.filter(book =>
    book.название.toLowerCase().includes(searchTerm) ||
    book.описание.toLowerCase().includes(searchTerm)
  );

  resultHeading.innerHTML = `<h2>Результаты поиска для '${searchTerm}':</h2>`;
  displayBooks(filteredBooks);
  searchInput.value = '';
}

// Показать случайную книгу
async function showRandomBook() {
  const books = await getBooks();
  const randomIndex = Math.floor(Math.random() * books.length);
  const randomBook = [books[randomIndex]];
  resultHeading.innerHTML = `<h2>Случайная книга:</h2>`;
  displayBooks(randomBook);
}

// Показать книги по жанру
async function showBooksByGenre(e) {
  const genre = e.target.innerText.toLowerCase();
  const books = await getBooks();
  const filteredBooks = books.filter(book => book.жанр.toLowerCase() === genre);
  resultHeading.innerHTML = `<h2>Книги жанра '${genre}':</h2>`;
  displayBooks(filteredBooks);
}

// События
submitForm.addEventListener('submit', searchBooks);
randomBtn.addEventListener('click', showRandomBook);
showAllBtn.addEventListener('click', showAllBooks);
genreButtons.forEach(button => button.addEventListener('click', showBooksByGenre));

// Очистка контента при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  resultHeading.innerHTML = ''; // Очистить заголовок при загрузке страницы
  booksEl.innerHTML = ''; // Очистить контейнер с книгами при загрузке страницы
});
