$(function() {
    $('#wrapper').hide();
    $('#wrapper').fadeIn(1000);
    $('#leftsidebar.sidebarbutton').click(function() {
        alert('Loading ' + $(this).html());
    });
});
