document.addEventListener('DOMContentLoaded', () => {
  const products = document.querySelector('.products');

  let show = 16;
  let currentPage = 1;
  let bancodedados;

  const sendHtml = () => {
    products.innerHTML = '';

    const start = (currentPage - 1) * show;
    const end = currentPage * show;

    bancodedados.slice(start, end).forEach((db) => {
      const productCard = document.createElement('div');
      productCard.classList.add('productCard');
      productCard.classList.add('visible');

      const productImg = document.createElement('img');
      productImg.classList.add('productImg');
      productImg.src = db.img;
      productImg.alt = db.name;
      productCard.appendChild(productImg);

      const productInfo = document.createElement('div');
      productInfo.classList.add('productInfo');

      const productName = document.createElement('div');
      productName.classList.add('productName');
      productName.innerHTML = db.name;

      const productDescription = document.createElement('div');
      productDescription.classList.add('productDescription');
      productDescription.innerHTML = db.description;

      const productPrice = document.createElement('div');
      productPrice.classList.add('productPrice');
      productPrice.innerHTML = db.price;

      const button = document.createElement('div');
      button.classList.add('button', 'hidden');

      const buttonDetails = document.createElement('button');
      buttonDetails.innerHTML = 'See Details';

      const details = document.createElement('div');
      details.classList.add('details');

      const ul = document.createElement('ul');

      const createListItem = (imgSrc, text) => {
        const li = document.createElement('li');
        const imgButton = document.createElement('img');
        imgButton.src = imgSrc;
        const aButton = document.createElement('a');
        aButton.innerHTML = text;
        li.appendChild(imgButton);
        li.appendChild(aButton);
        return li;
      };
      const bg = document.createElement('div');
      bg.classList.add('bg');

      ul.appendChild(createListItem('./assets/icons/share.png', 'Share'));
      ul.appendChild(createListItem('./assets/icons/compare.png', 'Compare'));
      ul.appendChild(createListItem('./assets/icons/like.png', 'Like'));

      details.appendChild(ul);

      button.appendChild(buttonDetails);
      button.appendChild(details);
      button.appendChild(bg);

      productInfo.appendChild(productName);
      productInfo.appendChild(productDescription);
      productInfo.appendChild(productPrice);

      productCard.appendChild(productInfo);
      productCard.appendChild(button);

      products.appendChild(productCard);
    });

    addHoverEffect();
    updatePagination();

  };

  const updatePagination = () => {
    const paginationList = document.getElementById('paginationList');
    paginationList.innerHTML = '';

    const totalPages = Math.ceil(bancodedados.length / show);

    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement('li');
      li.innerHTML = `<a href="#" class="${
        i === currentPage ? 'active' : ''
      }">${i}</a>`;
      li.addEventListener('click', () => {
        currentPage = i;
        sendHtml();
      });
      paginationList.appendChild(li);
    }

    const nextPageButton = document.getElementById('nextPage');
    nextPageButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        sendHtml();
      }
    });
  };

  const addHoverEffect = () => {
    const productCards = document.querySelectorAll('.productCard');
    productCards.forEach((productCard) => {
      productCard.addEventListener('mouseover', () => {
        const button = productCard.querySelector('.button');
        button.classList.remove('hidden');
        button.classList.add('visible');
      });

      productCard.addEventListener('mouseout', () => {
        const button = productCard.querySelector('.button');
        button.classList.remove('visible');
        button.classList.add('hidden');
      });
    });
  };

  fetch('./db/db.json')
    .then((response) => response.json())
    .then((db) => {
      bancodedados = db;
      sendHtml();
    })
    .catch((error) => console.error('Erro ao carregar o JSON:', error));

  // Menu
  const sidebar = document.querySelector('.sidebar');
  const toggleButton = document.getElementById('toggleSidebar');

  const showSidebar = () => {
    if (sidebar) {
      sidebar.classList.add('visible');
    }
  };

  const closeMenu = document.querySelector('.closeMenu');
  if (closeMenu) {
    closeMenu.addEventListener('click', () => {
      if (sidebar) {
        sidebar.classList.remove('visible');
      }
    });
  }

  if (toggleButton) {
    toggleButton.addEventListener('click', showSidebar);
  }


  const productCount = document.querySelector('#productCount');
  productCount.addEventListener('keydown', function (event) {
    
    console.log('re');
    if (event.key === 'Enter') {
      show = parseInt(productCount.value, 10);
      sendHtml();
    }
  });
});
