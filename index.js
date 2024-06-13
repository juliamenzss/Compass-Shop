document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.pagination ul li a');
  const nextButton = document.getElementById('nextButton');
  let currentValue = 1;

  function setActiveLink(index) {
    links.forEach((link) => link.parentElement.classList.remove('active'));
    links[index].parentElement.classList.add('active');
    currentValue = index + 1;
  }

  links.forEach((link, index) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      setActiveLink(index);
    });
  });

  nextButton.addEventListener('click', () => {
    if (currentValue < links.length) {
      setActiveLink(currentValue);
    } else {
      alert('This is the last page.');
    }
  });
});

const productCard = document.querySelectorAll('.productCard');

productCard.forEach((productCard) => {
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
