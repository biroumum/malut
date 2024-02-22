// Function to fetch books data from a specific HTML page
function fetchBooksData(pageUrl) {
return new Promise((resolve, reject) => {
    fetch(pageUrl)
        .then(response => response.text())
        .then(html => {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const scriptElement = doc.querySelector('script[type="text/javascript"]');
            const scriptContent = scriptElement.innerText;

            // Extract booksData from the script content
            const startIndex = scriptContent.indexOf('const booksData = [');
            const endIndex = scriptContent.indexOf('];', startIndex) + 2;
            const booksDataString = scriptContent.substring(startIndex, endIndex);

            // Convert booksData string to a JavaScript object
            const parsedBooksData = eval(`(${booksDataString})`);

            resolve(parsedBooksData);
        })
        .catch(error => {
            reject(error);
        });
});
}
function loadBooksData() {
  const disposisi1DataPromise = fetchBooksData('disposisi1.html');
  const disposisi2DataPromise = fetchBooksData('disposisi2.html');

  Promise.all([disposisi1DataPromise, disposisi2DataPromise])
    .then(([disposisi1Data, disposisi2Data]) => {
      booksData = [...disposisi1Data, ...disposisi2Data];
      generatePages(booksData, 3);
    })
    .catch(error => {
      console.error('Error loading books data:', error);
    });
}

// Function to generate HTML for a book
function generateBookHTML(book) {
  return `
    <div class="book">
        <h3>${book.title}</h3>
        <img src="${book.image}" alt="${book.title} Cover" class="book-image">
        <p>Author: ${book.author}</p>
        <p>Tanggal: ${book.genre}</p>
        <a href="${book.pdfLink}" download="${book.title}.pdf" class="download-button">Download PDF</a>
        <p>${book.description}</p>
    </div>
  `;
}

// Function to generate pages based on books
function generatePages(books, booksPerPage) {
  const booksContainer = document.getElementById("booksContainer");
  let currentPage = 1;

  for (let i = 0; i < books.length; i += booksPerPage) {
    const pageBooks = books.slice(i, i + booksPerPage);

    const pageContainer = document.createElement("div");
    pageContainer.className = "book-container";

    pageBooks.forEach(book => {
      const bookHTML = generateBookHTML(book);
      pageContainer.innerHTML += bookHTML;
    });

    pageContainer.id = `page${currentPage}`;
    booksContainer.appendChild(pageContainer);
    currentPage++;
  }
}

function searchBooks() {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const filteredBooks = booksData.filter(book => book.title.toLowerCase().includes(searchInput));

  // Clear existing content in booksContainer
  const booksContainer = document.getElementById("booksContainer");
  booksContainer.innerHTML = '';

  // Generate pages based on filtered books
  generatePages(filteredBooks.length > 0 ? filteredBooks : booksData, 3);
}

      // Call the function to generate pages with 3 books per page
      generatePages(booksData, 3);
// Call the function to load books data from both pages
loadBooksData();

/*-------------------------PAGINATION KEARSIPAN--------------------*/

const pagination = document.querySelector('.pagination');
const prevBtn = pagination.querySelector('.prev');
const nextBtn = pagination.querySelector('.next');
const pageLinks = pagination.querySelectorAll('a:not(.prev):not(.next)');

// Dapatkan nilai currentPage dari URL
const params = new URLSearchParams(window.location.search);
let currentPage = parseInt(params.get('page')) || 1;

function goToNextPage() {
  if (currentPage < pageLinks.length) {
    currentPage++;
    const nextPageUrl = `disposisi${currentPage}.html?page=${currentPage}`;
    window.location.href = nextPageUrl;
  }
}

function automatePagination() {
  // Specify the number of pages you want to navigate
  const totalPagesToNavigate = 5; // Change this value as needed

  for (let i = 0; i < totalPagesToNavigate; i++) {
    setTimeout(goToNextPage, i * 1000); // Delay each navigation by 1 second (adjust as needed)
  }
}

// Uncomment the line below to start the automated pagination
// automatePagination();

// Rest of the code remains the same
prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    const prevPageUrl = `disposisi${currentPage}.html?page=${currentPage}`;
    window.location.href = prevPageUrl;
  }
});

nextBtn.addEventListener('click', goToNextPage);

pageLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    currentPage = parseInt(link.textContent);
    const pageUrl = `disposisi${currentPage}.html?page=${currentPage}`;
    window.location.href = pageUrl;
  });
});

function updatePagination() {
  pageLinks.forEach(link => {
    link.classList.remove('active');
    if (parseInt(link.textContent) === currentPage) {
      link.classList.add('active');
    }
  });

  if (currentPage === 1) {
    prevBtn.classList.add('disabled');
  } else {
    prevBtn.classList.remove('disabled');
  }

  if (currentPage === pageLinks.length) {
    nextBtn.classList.add('disabled');
  } else {
    nextBtn.classList.remove('disabled');
  }
}

updatePagination();
