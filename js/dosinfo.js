function emptyTag(type) {
    return '<' + type + '></' + type + '>';
}

function loadXML(file, oncomplete) {
    $.ajax({
        url: 'pages/' + file,
        type: 'GET',
        dataType: 'xml',
        success: function(xml) {
            $('#maincontent').children().remove();
            $(xml).find('section').each(function() {
                var elem = $('<div class="section"></div>');
                $(this).children().each(function() {
                    var tagName = $(this).prop('tagName');
                    var isHeader = tagName.toLowerCase() === 'header';
                    $(emptyTag(isHeader ? 'h1' : 'p'))
                        .html($(this).text())
                        .appendTo(elem);
                });
                elem.appendTo('#maincontent');
            });
        },
        error: function() {
            $('<div class="section"></div>')
                .html('<p>Error loading ' + file + '</p>')
                .appendTo('#maincontent');
        },
        complete: oncomplete
    });
}

function loadPage(page, oncomplete) {
    loadXML(page + '.xml', oncomplete);
}

$(function() {
    $('#wrapper').hide();
    loadPage('intro', function() {
        $('#wrapper').fadeIn(1000);
    });
    $('#leftsidebar .sidebarbutton').click(function() {
        var file = this.id;
        $('#wrapper').fadeOut(500, function() {
            loadPage(file, function() {
                $('#wrapper').fadeIn(500);
            });
        });
    });
    new Konami(function() {
        $('link[href="styles/dosinfo.css"]').attr('href','styles/dosinfo_horrible.css');
    });
});
