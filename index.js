document.addEventListener('DOMContentLoaded', () => {
  const products = document.querySelector('.products');
  const resultsPage = document.querySelector('.resultsPage');
  let show = 16;
  let currentPage = 1;
  let bancodedados;

  const sendHtml = () => {
    products.innerHTML = '';

    // MESSAGE SHOWING 1-16 PRODUCTS
    function createMessageResult() {
      if (
        !bancodedados ||
        !Array.isArray(bancodedados) ||
        bancodedados.length === 0
      ) {
        resultsPage.innerHTML = 'Invalid Value';
        return;
      }

      const totalPages = Math.ceil(bancodedados.length / show);
      if (
        currentPage < 1 ||
        currentPage > totalPages ||
        show > bancodedados.length
      ) {
        resultsPage.innerHTML = 'Invalid Value';
        return;
      }

      let start = (currentPage - 1) * show + 1;

      let end = Math.min(currentPage * show, bancodedados.length);
      let message = `Showing ${start}-${end} of ${bancodedados.length} results`;
      resultsPage.innerHTML = message;
    }

    if (show > 0) {
      createMessageResult();
    }

    document
      .getElementById('productCount')
      .addEventListener('input', function (e) {
        var value = parseInt(e.target.value);
        if (value < 1) {
          e.target.value = show;
        }
      });

    const start = (currentPage - 1) * show;
    const end = Math.min(currentPage * show, bancodedados.length);

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

      const containerPrice = document.createElement('div');
      containerPrice.classList.add('containerPrice');

      // DISCOUNT
      const productPrice = document.createElement('div');
      productPrice.classList.add('productPrice');
      productPrice.innerHTML = `Rp ${db.priceLast}`;

      const priceWithoutDiscount = document.createElement('div');

      if (db.discount == true) {
        priceWithoutDiscount.classList.add('originalPrice');
        priceWithoutDiscount.innerHTML = `Rp ${db.priceWithoutDiscount}`;
      }

      // TAG DISCOUNT
      const newDiscount = document.createElement('div');
      if (db.discount === true || db.percentageDiscount === '30') {
        newDiscount.classList.add('discountBadge');
        newDiscount.innerHTML = `${db.percentageDiscount}%`;
      } else {
        newDiscount.classList.remove('newDiscount');
      }

      // TAG NEW PRODUCT
      const newBadge = document.createElement('div');
      if (db.productNew === true) {
        newBadge.classList.add('newBadge');
        newBadge.innerHTML = 'New';
      } else {
        newBadge.classList.remove('newBadge');
      }

      // SECTION DETAILS ABOUT PRODUCT INSIDE HOVER
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

      containerPrice.appendChild(productPrice);
      containerPrice.appendChild(priceWithoutDiscount);

      productInfo.appendChild(containerPrice);

      productCard.appendChild(newBadge);
      productCard.appendChild(newDiscount);

      productCard.appendChild(productInfo);
      productCard.appendChild(button);

      products.appendChild(productCard);
    });

    addHoverEffect();
    updatePagination();
  };

  // HOVER EFFECT
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

  // PAGINATION
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

  // MENU HAMBURGUER
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

  // CLICK ENTER AND UPDATE HTML -- USE FOR FILTER PER PAGE
  const productCount = document.querySelector('#productCount');
  productCount.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      show = parseInt(productCount.value, 10);
      sendHtml();
    }
  });

  const filterImg = document.querySelector('.filterImg');
  const containerFilter = document.querySelector('.containerFilter');
  filterImg.addEventListener('click', () => {
    containerFilter.classList.toggle('hidden');
  });

  // DB CONNECTION
  fetch('./db/db.json')
    .then((response) => response.json())
    .then((db) => {
      bancodedados = db;
      sendHtml();
    })
    .catch((error) => console.error('Error, try again', error));

  // EMAIL VALIDATION
  const buttonOk = document.querySelectorAll('.buttonOk');
  const overlay = document.querySelector('.overlay');
  const validEmail = document.querySelector('.validEmail');
  const invalidEmail = document.querySelector('.invalidEmail');
  const submit = document.querySelector('.subscribe');
  const inputEmail = document.querySelector('#email');

  submit.addEventListener('click', function () {
    const email = inputEmail.value;

    // BOX VALIDATION EMAIL
    if (isValidEmail(email)) {
      inputEmail.value = '';
      validEmail.classList.add('visible');
      overlay.classList.add('visible');
    } else {
      inputEmail.value = '';
      overlay.classList.add('visible');
      invalidEmail.classList.add('visible');
    }
  });

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  buttonOk.forEach((button) => {
    button.addEventListener('click', () => {
      overlay.classList.remove('visible');
      invalidEmail.classList.remove('visible');
      validEmail.classList.remove('visible');
    });
  });

  // FILTER PRICE AND NAME
  const convertPriceToNumber = (priceStr) => {
    const numericValue = parseFloat(
      priceStr.replace(/[^\d.,]/g, '').replace(',', '.')
    );
    return isNaN(numericValue) ? 0 : numericValue;
  };

  const customRadio = document.querySelectorAll('.customRadio');
  let checkedRadio = '';
  let filter = false;
  customRadio.forEach((radio) => {
    radio.addEventListener('click', () => {
      if (radio.checked) {
        if (checkedRadio === '') {
          checkedRadio = radio.id;
          filter = true;
        } else if (checkedRadio === radio.id) {
          radio.checked = false;
          checkedRadio = '';
          filter = false;
          containerFilter.classList.toggle('hidden');
          location.reload();
        } else {
          checkedRadio = radio.id;
          filter = true;
        }
      } else {
        checkedRadio = '';
      }

      if (filter) {
        if (radio.id == 'myCheckbox1') {
          bancodedados.sort((a, b) => a.name.localeCompare(b.name));
          currentPage = 1;
          sendHtml();
        } else if (radio.id == 'myCheckbox2') {
          bancodedados.sort((a, b) => b.name.localeCompare(a.name));
          currentPage = 1;
          sendHtml();
        } else if (radio.id == 'myCheckbox3') {
          bancodedados.sort((a, b) => {
            const priceA = convertPriceToNumber(a.priceLast);
            const priceB = convertPriceToNumber(b.priceLast);

            return priceB - priceA;
          });
          currentPage = 1;
          sendHtml();
        } else {
          bancodedados.sort((a, b) => {
            const priceA = convertPriceToNumber(a.priceLast);
            const priceB = convertPriceToNumber(b.priceLast);

            return priceA - priceB;
          });
          currentPage = 1;
          sendHtml();
        }
        containerFilter.classList.toggle('hidden');
      }
    });
  });
});
