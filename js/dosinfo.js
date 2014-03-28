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
                    var domItem = $(emptyTag(isHeader ? 'h1' : 'p'));
                    domItem.html(text).appendTo(elem);
                    if(isHeader) {
                        $(emptyTag('div'))
                            .click(function() {
                                $.scrollTo($(domItem).offset().top - 100, 'fast');
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

function changeImage() {
    var i = 0;       
    setInterval(function() {
        var pics = ["styles/horrible_banner_1.png", "styles/horrible_banner_2.png", "styles/horrible_banner_3.png", "styles/horrible_banner_4.png"];
        $('img[alt="Denial of Service Attacks"]').attr('src', pics[i]);
        i++;
        while(i > 3) {
            i = i - 4;
        }
    }, 250)
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
        $('img[src="styles/gfxAssets/DoSbanner.png"]').attr('src','styles/horrible_banner_4.png');
        $('img[src="styles/gfxAssets/footer.png"]').attr('src','styles/horrible_footer.png');
        changeImage();
        // Song Critical Acclaim by Avenged Sevenfold
        var audio = new Audio('styles/crit.mp3');
        audio.play();
    });
});