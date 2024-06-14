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
      if (!bancodedados || !Array.isArray(bancodedados) || bancodedados.length === 0) {
        resultsPage.innerHTML = 'Valor inválido';
        return;
      }

      const totalPages = Math.ceil(bancodedados.length / show);
      if (currentPage < 1 || currentPage > totalPages || show > bancodedados.length) {
        resultsPage.innerHTML = 'Valor inválido';
        return;
      }

      

      let start = (currentPage - 1) * show + 1;
      let end = Math.min(currentPage * show, bancodedados.length);
      let message = `Showing ${start}-${end} of ${bancodedados.length} results`;
      resultsPage.innerHTML = message;
    }

    if (show > 0) {
      createMessageResult()
    } 
    
 
    document.getElementById('productCount').addEventListener('input', function(e) {
      var value = parseInt(e.target.value);
      if (value < 1) {
          e.target.value = show
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





       // Discount
      const productPrice = document.createElement('div');
      productPrice.classList.add('productPrice');
      const originalPrice = parseFloat(db.price.replace(/[^\d,]/g, '').replace(',', '.'));
      const discountPrice = db.discount ? originalPrice * (1 - parseFloat(db.percentageDiscount) / 100) : originalPrice;
      productPrice.innerHTML = `Rp ${discountPrice.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

      const originalPriceElement = document.createElement('div');
      originalPriceElement.classList.add('originalPrice');
      if (db.discount) {
        originalPriceElement.innerHTML = `Rp ${originalPrice.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        originalPriceElement.style.textDecoration = 'line-through';
      }



  

      // TAG DISCOUNT
      const newDiscount = document.createElement('div')
      if (db.discount === true || db.percentageDiscount === "30") {
        newDiscount.classList.add('discountBadge');
        newDiscount.innerHTML = `${db.percentageDiscount}%`
      } else {
        newDiscount.classList.remove('newDiscount')
      }
      
      // TAG NEW PRODUCT
      const newBadge = document.createElement('div');
      if (db.productNew === true) {
        newBadge.classList.add('newBadge');
        newBadge.innerHTML = 'New';
      } else {
        newBadge.classList.remove('newBadge');
      }





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
      
      productCard.appendChild(newBadge);
      productCard.appendChild(newDiscount);
      
      productCard.appendChild(productInfo);
      productCard.appendChild(button);
      
      products.appendChild(productCard);
      });
      
      addHoverEffect();
      updatePagination();
      };
      
      
      
      // PAGINATION
      const updatePagination = () => {
        const paginationList = document.getElementById('paginationList');
        paginationList.innerHTML = '';
        
        const totalPages = Math.ceil(bancodedados.length / show);
        
        for (let i = 1; i <= totalPages; i++) {
          const li = document.createElement('li');
          li.innerHTML = `<a href="#" class="${i === currentPage ? 'active' : ''}">${i}</a>`;
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

  
  // MENU HAMBURGUER
  const sidebar = document.querySelector('.sidebar');
  const toggleButton = document.getElementById('toggleSidebar');
  
  const showSidebar = () => {
    if (sidebar) {
      sidebar.classList.add('visible');
      }
      };
      fetch('./db/db.json')
        .then((response) => response.json())
        .then((db) => {
          bancodedados = db;
          sendHtml();
        })
        .catch((error) => console.error('Erro ao carregar o JSON:', error));

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
    if (event.key === 'Enter') {
      show = parseInt(productCount.value, 10);
      sendHtml();
    }
  });

  // EMAIL VALIDATION
    document.getElementById('email').addEventListener('input', function(e) {
      const email = e.target.value;
      // const result = document.getElementById('result');
  
      if (isValidEmail(email)) {
        alert('Email succeffully registered');
        e.target.value = ''
      } else {
        alert('Invalid email!');
        e.target.value = ''
      }
    });
  
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  });
  
  