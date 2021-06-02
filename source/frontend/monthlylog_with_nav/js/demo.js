var events = [
  {'Date': new Date(2021, 5, 10), 'Title': 'Doctor appointment at 3:25pm.'},
];

var settings = {};
var element = document.getElementById('caleandar');
caleandar(element, events, settings);

$(document).ready(function () {
  $("#sidebar").mCustomScrollbar({
      theme: "minimal"
  });

  $(function(){
      $('#sidebar').hover(function(){
          $('#sidebar, #content').toggleClass('active');
          $('#sidebarIcon').toggleClass('active');
          $('.collapse.in').toggleClass('in');
          $('a[aria-expanded=true]').attr('aria-expanded', 'false');
      },function(){
          $('#sidebar, #content').toggleClass('active');
          $('#sidebarIcon').toggleClass('active');
          $('.collapse.in').toggleClass('in');
          $('a[aria-expanded=true]').attr('aria-expanded', 'false');
      }).trigger('mouseleave');
      
      $('#sidebarIcon').hover(function(){
          $('#sidebar, #content').toggleClass('active');
          $('#sidebarIcon').toggleClass('active');
          $('.collapse.in').toggleClass('in');
          $('a[aria-expanded=true]').attr('aria-expanded', 'false');
      });
  });
});