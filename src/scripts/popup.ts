const createPopup = () => {
  const popup = document.createElement('div');
  popup.classList.add('pop-up');
  popup.innerHTML = `
    <div class="pop-up__overlay">
      <div class="pop-up__window">
        <div class="pop-up__title">Success</div>
        <div class="pop-up__message">Your account has been created!</div>
        <svg
          class="pop-up__icon"
          width="90"
          height="90"
          viewBox="0 0 90 90"
          fill="#35BD26"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M44.9999 0C20.1472 0 0 20.1472 0 44.9999C0 69.8527 20.1472 89.9998 44.9999 89.9998C69.8527 89.9998 89.9998 69.8527 89.9998 44.9999C89.9734 20.1583 69.8417 0.0265555 44.9999 0ZM44.9999 83.5713C23.6975 83.5713 6.4285 66.3023 6.4285 44.9999C6.4285 23.6975 23.6975 6.4285 44.9999 6.4285C66.3023 6.4285 83.5713 23.6975 83.5713 44.9999C83.5483 66.2929 66.2929 83.5483 44.9999 83.5713Z"
          />
          <path
            d="M69.6933 26.6559C68.4476 25.4528 66.4729 25.4528 65.2274 26.6559L35.357 56.526L24.7723 45.9413C23.5391 44.6644 21.5041 44.6292 20.2273 45.8624C18.9504 47.0957 18.9152 49.1306 20.1484 50.4074C20.1742 50.4341 20.2006 50.4605 20.2273 50.4863L33.0845 63.3434C34.3396 64.5983 36.3744 64.5983 37.6295 63.3434L69.7724 31.2006C71.0056 29.9239 70.9702 27.8891 69.6933 26.6559Z"
          />
        </svg>
        <button class="pop-up__button" id="pop-up__button">OK</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
};

let isClosing = false;

const openPopup = () => {
  if (!isClosing) {
    const popup = document.querySelector('.pop-up');
    popup.classList.add('pop-up--opened');
  }
};

const closePopup = () => {
  isClosing = true;
  const popup = document.querySelector('.pop-up');
  popup.classList.remove('pop-up--opened');
  popup.classList.add('pop-up--hidden');
  setTimeout(() => {
    popup.classList.remove('pop-up--hidden');
    isClosing = false;
  }, 200);
};

export { createPopup, openPopup, closePopup };
