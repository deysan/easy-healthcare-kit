(function infinityTopBar(count = 20) {
  const topBar = document.querySelector('.top-bar__ticker');
  const topBarContent = document.querySelector('.top-bar__content');
  for (i = 0; i < count - 1; i++) {
    topBar.appendChild(topBarContent.cloneNode(true));
  }
})();
