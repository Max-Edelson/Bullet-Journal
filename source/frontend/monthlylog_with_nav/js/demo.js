var events = [
  {'Date': new Date(2021, 5, 10), 'Title': 'Doctor appointment at 3:25pm.'},
];

var settings = {};
var element = document.getElementById('caleandar');
caleandar(element, events, settings);

$('#sidebar, #content').addClass('active');
$('#sidebarIcon').addClass('active');

$(document).ready(function () {
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $(function(){
        $('#sidebar').hover(function(){
            $('#sidebar, #content').removeClass('active');
            $('#sidebarIcon').removeClass('active');
            $('.collapse.in').removeClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        },function(){
            $('#sidebar, #content').addClass('active');
            $('#sidebarIcon').addClass('active');
            $('.collapse.in').addClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        }).trigger('mouseleave');
        
        $('#sidebarIcon').hover(function(){
            $('#sidebar, #content').removeClass('active');
            $('#sidebarIcon').removeClass('active');
            $('.collapse.in').removeClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        },function(){
            $('#sidebar, #content').addClass('active');
            $('#sidebarIcon').addClass('active');
            $('.collapse.in').addClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        }).trigger('mouseleave');
    });
});