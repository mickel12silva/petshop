/*
  Simple client-side routing and interactions.
  - Switch views when clicking nav or buttons with data-route
  - Mark active nav
  - Add small keyboard support (1: Home, 2: Cães, 3: Gatos)
*/

const routes = {
  home: document.getElementById('view-home'),
  caes: document.getElementById('view-caes'),
  gatos: document.getElementById('view-gatos')
};

const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const logo = document.querySelector('.logo');
const routeButtons = Array.from(document.querySelectorAll('[data-route]'));

function showRoute(name){
  Object.keys(routes).forEach(k => {
    routes[k].classList.toggle('active', k === name);
  });

  navLinks.forEach(a => {
    a.classList.toggle('active', a.dataset.route === name);
  });

  // update focus for a11y
  const titleMap = {home:'Home', caes:'Cães', gatos:'Gatos'};
  document.title = `PetJoy • ${titleMap[name] || ''}`;
}

routeButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const r = btn.dataset.route;
    if(r && routes[r]) {
      e.preventDefault();
      showRoute(r);
      // small scroll to top of app area (useful on mobile if virtual keyboard showed)
      window.scrollTo({top:0,behavior:'smooth'});
    }
  });
});

// Nav links
navLinks.forEach(a => a.addEventListener('click', (e) => {
  e.preventDefault();
  const r = a.dataset.route;
  if(r) showRoute(r);
}));

// Logo goes to home
logo.addEventListener('click', (e) => {
  e.preventDefault();
  showRoute('home');
});

// Keyboard shortcuts: 1,2,3 to navigate (quick)
window.addEventListener('keydown', (ev) => {
  if(ev.target.tagName === 'INPUT' || ev.target.tagName === 'TEXTAREA') return;
  if(ev.key === '1') showRoute('home');
  if(ev.key === '2') showRoute('caes');
  if(ev.key === '3') showRoute('gatos');
});

// Add subtle zoom on touch for cards (touch friendliness)
document.querySelectorAll('.breed-card').forEach(card => {
  card.addEventListener('touchstart', () => card.style.transform = 'scale(1.01)');
  card.addEventListener('touchend', () => card.style.transform = '');
  card.addEventListener('mousedown', () => card.style.transform = 'scale(1.01)');
  card.addEventListener('mouseup', () => card.style.transform = '');
  card.addEventListener('mouseleave', () => card.style.transform = '');
});

// Initialize default route
showRoute('home');