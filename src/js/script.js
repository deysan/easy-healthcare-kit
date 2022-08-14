const menuOpenBtn = document.querySelector('.header__menu-btn');

const mobileMenu = `
<div class="header__mobile">
  <nav class="header__navigation navigation navigation--mobile">
    <ul class="navigation__list navigation__list--mobile">
      <li class="navigation__item">
        <a href="#!" class="navigation__link">About</a>
      </li>
      <li class="navigation__item">
        <a href="#!" class="navigation__link">How it works</a>
      </li>
      <li class="navigation__item">
        <a href="#!" class="navigation__link">Blog</a>
      </li>
      <li class="navigation__item user-actions__item">
        <a
          href="#!"
          class="user-actions__link user-actions__link--user btn btn--small btn--shadow-black"
        >
          <img
            src="../img/user-icon.svg"
            width="22"
            height="22"
            alt="User"
            aria-label="User"
          />
        </a>
      </li>
    </ul>
  </nav>
  <button
    class="navigation__close"
    type="button"
    aria-label="Закрыть"
  ></button>
</div>`;

menuOpenBtn.onclick = function () {
  document.body.classList.toggle('no-scroll');
  document.body.insertAdjacentHTML('afterbegin', mobileMenu);
  const overlay = document.createElement('div');
  document.body.prepend(overlay);
  overlay.classList.add('overlay');

  const menu = document.querySelector('.header__mobile');

  setTimeout(() => {
    menu.style.opacity = 1;
    overlay.style.opacity = 1;
  }, 100);

  const onClose = () => {
    if (menu) menu.remove();
    if (overlay) overlay.remove();
    document.body.classList.toggle('no-scroll');
  };

  document
    .querySelector('.navigation__close')
    .addEventListener('click', function (event) {
      event.preventDefault();
      onClose();
    });

  overlay.addEventListener('click', function (event) {
    event.preventDefault();
    onClose();
  });

  window.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
      if (document.querySelector('.header__mobile')) {
        event.preventDefault();
        onClose();
      }
    }
  });
};
