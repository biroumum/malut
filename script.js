const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const pages = document.querySelectorAll('.page');
let currentPage = 1;

prevButton.addEventListener('click', () => {
  if (currentPage === 1) return;
  currentPage--;
  updatePagination();
});

nextButton.addEventListener('click', () => {
  if (currentPage === pages.length) return;
  currentPage++;
  updatePagination();
});

function updatePagination() {
  pages.forEach(page => page.classList.remove('active'));
  pages[currentPage - 1].classList.add('active');
}

updatePagination();