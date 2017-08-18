import datepickers from 'application/datepicker';
import menuToggle from 'application/menu';
import notificationHide from 'application/notifications';


// Datepicker
document.addEventListener('turbolinks:load', () => {
  datepickers.initialize();
});


// Menu
document.addEventListener('turbolinks:load', () => {
  menuToggle.initialize();
});
document.addEventListener('turbolinks:before-cache', () => {
  menuToggle.destroy();
});

// Noticiation
document.addEventListener('turbolinks:load', () => {
  notificationHide.initialize();
});
