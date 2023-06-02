const pagination = document.querySelector('.pagination');
const prevBtn = pagination.querySelector('.prev');
const nextBtn = pagination.querySelector('.next');
const pageLinks = pagination.querySelectorAll('a:not(.prev):not(.next)');

// Dapatkan nilai currentPage dari URL
const params = new URLSearchParams(window.location.search);
let currentPage = parseInt(params.get('page')) || 1;

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    const prevPageUrl = `beritaterbaru${currentPage}.html?page=${currentPage}`;
    window.location.href = prevPageUrl;
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPage < pageLinks.length) {
    currentPage++;
    const nextPageUrl = `beritaterbaru${currentPage}.html?page=${currentPage}`;
    window.location.href = nextPageUrl;
  }
});

pageLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    currentPage = parseInt(link.textContent);
    const pageUrl = `beritaterbaru${currentPage}.html?page=${currentPage}`;
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
