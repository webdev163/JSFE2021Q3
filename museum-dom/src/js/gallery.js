window.addEventListener('load', () => {
  const pictureInnerContainer = document.querySelector('.gallery-inner-wrapper');
  let animationClass;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function getRandomItems() {
    const arr = [['galery1', 'square'], ['galery2', 'vertical'], ['galery3', 'vertical'], ['galery4', 'square'], ['galery5', 'vertical'], ['galery6', 'vertical'], ['galery7', 'vertical'], ['galery8', 'vertical'], ['galery9', 'vertical'], ['galery10', 'square'], ['galery11', 'square'], ['galery12', 'horizontal'], ['galery13', 'horizontal'], ['galery14', 'vertical'], ['galery15', 'square']];

    const shuffledArr = shuffle(arr);
    shuffledArr.map((el) => {
      pictureInnerContainer.innerHTML += `<img class="gallery-item gallery-item-${el[1]} hidden" src="assets/img/galery/${el[0]}.jpg" alt="${el[0]}">`;
    });
  }

  getRandomItems();
});
