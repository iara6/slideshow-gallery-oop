function checkElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(`${selection} selector does not exist!`);
}

class Gallery {
  constructor(element) {
    this.container = element;
    this.imgList = [...element.querySelectorAll('.img')];
    this.modal = checkElement('.modal');
    this.modalImg = checkElement('.main-img');
    this.imageName = checkElement('.image-name');
    this.modalImages = checkElement('.modal-images');
    this.closeBtn = checkElement('.close-btn');
    this.nextBtn = checkElement('.next-btn');
    this.prevBtn = checkElement('.prev-btn');
    // bind functions
    this.closeModal = this.closeModal.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
    this.pickImage = this.pickImage.bind(this);
    this.windowClick = this.windowClick.bind(this);
    // container event
    this.container.addEventListener('click', (e) => {
      if (e.target.classList.contains('img')) {
        this.openModal(e.target, this.imgList);
      }
     } // no bind, since it's an arrow function
   );
   window.addEventListener('click', this.windowClick);
  }
  
  windowClick(e) {
    if (e.target === this.modal) {
      this.closeModal();
    }
  };

  openModal(selectedImg, imgList) {
    this.setMainImage(selectedImg);
    this.modalImages.innerHTML =
      imgList.map((image) => {
        return `
          <img src="${image.src}" title="${image.title}" class="${selectedImg.dataset.id === image.dataset.id ? 'modal-img selected' : 'modal-img'}" data-id="${image.dataset.id}">`;
      }).join('');
    this.modal.classList.add('open');
    document.body.style.overflow = "hidden";
    this.closeBtn.addEventListener('click', this.closeModal);
    this.nextBtn.addEventListener('click', this.nextImage);
    this.prevBtn.addEventListener('click', this.prevImage);
    this.modalImages.addEventListener('click', this.pickImage);
    window.addEventListener('click', this.windowClick);
  }
  
  setMainImage(selectedImg) {
    this.modalImg.src = selectedImg.src;
    this.imageName.textContent = selectedImg.title;
  }

  closeModal() {
    this.modal.classList.remove('open');
    document.body.style.overflow = "auto";
    this.closeBtn.removeEventListener('click', this.closeModal);
    this.nextBtn.removeEventListener('click', this.nextImage);
    this.prevBtn.removeEventListener('click', this.prevImage);
    this.modalImages.removeEventListener('click', this.pickImage);
    window.removeEventListener('click', this.windowClick);
  }

  nextImage() {
    const selected = this.modalImages.querySelector('.selected');
    const next = 
      selected.nextElementSibling || this.modalImages.firstElementChild;
    selected.classList.remove('selected');
    next.classList.add('selected');
    this.setMainImage(next);
  }

  prevImage() {
    const selected = this.modalImages.querySelector('.selected');
    const prev = 
      selected.previousElementSibling || this.modalImages.lastElementChild;
    selected.classList.remove('selected');
    prev.classList.add('selected');
    this.setMainImage(prev);
  }

  pickImage(e) {
    if (e.target.classList.contains('modal-img')) {
      const selected = this.modalImages.querySelector('.selected');
      selected.classList.remove('selected');
      this.setMainImage(e.target);
      e.target.classList.add('selected');
    }
  }
}

const fall = new Gallery(checkElement('.fall'));
const halloween = new Gallery(checkElement('.halloween'));