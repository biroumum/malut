const pagination = document.querySelector('.pagination');
  const prevBtn = pagination.querySelector('.prev');
  const nextBtn = pagination.querySelector('.next');
  const pageLinks = pagination.querySelectorAll('a:not(.prev):not(.next)');
  let currentPage = 1;

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      updatePagination();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage < pageLinks.length) {
      currentPage++;
      updatePagination();
    }
  });

  pageLinks.forEach(link => {
    link.addEventListener('click', () => {
      currentPage = parseInt(link.textContent);
      updatePagination();
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