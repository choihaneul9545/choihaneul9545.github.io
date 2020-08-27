// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  console.log(event.target.dataset.link);
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  console.log(event.target.dataset.link);
  const scrollTo = document.querySelector(link);
  scrollTo.scrollIntoView();
});

const navbarMenuBar = document.querySelector('.navbar__menu__bar');

navbarMenuBar.addEventListener('click', (e) => {
  navbarMenu.classList.toggle('open');
});

navbarMenu.addEventListener('click', () => {
  navbarMenu.classList.remove('open');
});
