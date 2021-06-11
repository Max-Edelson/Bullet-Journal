$('#sidebar, #content').addClass('active');
$('#sidebarIcon').addClass('active');

$(document).ready(function () {
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $(function(){
        $('#sidebar, #sidebarIcon').hover(function(){
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

$(window).on('hashchange',function(){ 
    window.location.reload(true); 
});

// let cusNames = storage.cusNames;

// function updateNavbarLogs(cusNames) {
//     let navBar_Logs = document.getElementById("pageSubmenu");
//     navBar_Logs.innerHTML = "";
//     cusNames.forEach((log) => {
//         let li = document.createElement("li");
//         li.innerHTML = "<a href='../custom_log/index.html#" + log + "'>" + log + "</a>"
//         navBar_Logs.appendChild(li);
//     });

//     let li = document.createElement("li");
//     li.innerHTML = "<img src='create.png' alt='Create Icon'><button id='custom_add'>New Log</button>"
//     navBar_Logs.appendChild(li);
// }

// updateNavbarLogs(cusNames);

// let addCustom = document.getElementById("new-custom");
// let addCustomButton = document.getElementById("custom_add");
// let addCustomCancel = document.getElementById("custom_cancel");
// let addCustomAccept = document.getElementById("custom_save");

// addCustomButton.onclick = function(){
//     addCustom.hidden = false;
// }

// addCustomCancel.onclick = function() {
//     document.getElementById('custom_name').value='';
//     addCustom.hidden = true;
// }

// addCustomAccept.onclick = function() {
//     storage.createLog(document.getElementById('custom_name').value);
//     addCustom.hidden = true;

//     updateNavbarLogs(storage.cusNames);

//     document.getElementById('custom_name').value='';
//     addCustomButton = document.getElementById("custom_add");
//     addCustomButton.onclick = function(){
//         addCustom.hidden = false;
//     }
// }