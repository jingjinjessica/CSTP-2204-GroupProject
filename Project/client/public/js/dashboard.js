var sidebar = document.getElementById('sidebar');
var buttonSidebarCollapse = document.querySelector('[data-toggle="sidebar-collapse"]');
var buttonSidebarExpand = document.querySelector('[data-toggle="sidebar-expand"]');
var sidebarIconExpand = buttonSidebarExpand.querySelector('.nav-link-icon');
var sidebarLinkTexts = sidebar.querySelectorAll('.nav-link-text');
var sidebarLinkIcons = sidebar.querySelectorAll('.nav-link-icon');

var boolSidebarShow = false;
var boolSidebarGrow = false;
var breakpoints = {
  'sm': 576,
  'md': 768,
  'lg': 992,
  'xl': 1200,
  'xxl': 1400
};

buttonSidebarCollapse.addEventListener('click', toggleSidebarCollapse);
buttonSidebarExpand.addEventListener('click', toggleSidebarExpand);
window.addEventListener('resize', updateSidebarDisplay);

window.onload = function() {
  updateSidebarDisplay();
};

function updateSidebarDisplay() {
  windowWidth = window.innerWidth;

  if (windowWidth <= breakpoints['sm']) {
    /* Default to both minimized */
    sidebarHide();
    sidebarShrink();
  }

  if (windowWidth > breakpoints['sm'] && windowWidth <= breakpoints['lg']) {
    /* Small and medium devices show shrunk sidebar */
    sidebarShow();
    sidebarShrink();
  }

  if (windowWidth > breakpoints['lg']) {
    /* Large devices and bigger show both */
    sidebarShow();
    sidebarGrow();
  }
}

function toggleSidebarCollapse() {
  boolSidebarShow ? sidebarHide() : sidebarShow();
}

function toggleSidebarExpand() {
  boolSidebarGrow ? sidebarShrink() : sidebarGrow();
}

function sidebarHide() {
  boolSidebarShow = false;
  sidebar.classList.remove('d-flex');
  sidebar.classList.add('d-none');
}

function sidebarShow() {
  boolSidebarShow = true;
  sidebar.classList.remove('d-none');
  sidebar.classList.add('d-flex');
}

function sidebarShrink() {
  boolSidebarGrow = false;
  sidebarIconExpand.classList.remove('fa-angles-left');
  sidebarIconExpand.classList.add('fa-angles-right');
  sidebar.classList.add('shrink');
  sidebarLinkTexts.forEach(
    text => {text.classList.add('d-none')}
  );
  sidebarLinkIcons.forEach(
    icon => { icon.classList.remove('me-2') }
  );
}

function sidebarGrow() {
  boolSidebarGrow = true;
  sidebarIconExpand.classList.remove('fa-angles-right');
  sidebarIconExpand.classList.add('fa-angles-left');
  sidebar.classList.remove('shrink');
  sidebarLinkTexts.forEach(
    text => {text.classList.remove('d-none')}
  );
  sidebarLinkIcons.forEach(
    icon => { icon.classList.add('me-2') }
  );
}