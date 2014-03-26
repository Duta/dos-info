$(function() {
    $('#wrapper').hide();
    $('#wrapper').fadeIn(1000);
    $('#leftsidebar .sidebarbutton').click(function() {
        var file = this.id + '.xml';
        $('#wrapper').fadeOut(500, function() {
            $('#maincontent').children().remove();
            $.ajax({
                url: 'pages/' + file,
                type: 'GET',
                dataType: 'xml',
                success: function(xml) {
                    $(xml).find('section').each(function() {
                        var elem = $('<div class="section"></div>');
                        $(this).find('paragraph').each(function() {
                            $('<p></p>').html($(this).text()).appendTo(elem);
                        });
                        elem.appendTo('#maincontent');
                    });
                },
                error: function() {
                    $('<div class="section"></div>')
                        .html('<p>Error loading ' + file + '</p>')
                        .appendTo('#maincontent');
                },
                complete: function() {
                    $('#wrapper').fadeIn(500);
                }
            });
        });
    });
    new Konami(function() {
        $('link[href="styles/dosinfo.css"]').attr('href','styles/dosinfo_horrible.css');
    });
});
