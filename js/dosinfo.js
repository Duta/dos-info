function emptyTag(type) {
    return '<' + type + '></' + type + '>';
}

function loadXML(file, oncomplete) {
    $.ajax({
        url: 'pages/' + file,
        type: 'GET',
        dataType: 'xml',
        success: function(xml) {
            var headerLinks = $('#rightsidebar');
            headerLinks.children().remove();
            $('#maincontent').children().remove();
            $(xml).find('section').each(function() {
                var elem = $('<div class="section"></div>');
                $(this).children().each(function() {
                    var tagName = $(this).prop('tagName');
                    var isHeader = tagName.toLowerCase() === 'header';
                    var text = $(this).text().trim();
                    $(emptyTag(isHeader ? 'h1' : 'p'))
                        .html(text)
                        .appendTo(elem);
                    if(isHeader) {
                        $(emptyTag('div'))
                            .click(function() {
                                alert('TODO: Load ' + text);
                            })
                            .attr('class', 'sidebarbutton')
                            .html(text)
                            .appendTo(headerLinks);
                    }
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
    loadXML(page.toLowerCase() + '.xml', oncomplete);
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
        $('img[src="styles/gfxAssets/DoSbanner.png"]').attr('src','styles/horrible_banner.png');
        $('img[src="styles/gfxAssets/footer.png"]').attr('src','styles/horrible_footer.png');
    });
});