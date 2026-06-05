$(document).ready(function() {
    function loadPage(page) {
        $.ajax({
            url: 'pages/' + page + '.html',
            method: 'GET',
            success: function(data) {
                $('#content').html(data);
                if (page === 'inicio') {
                    initSlider();
                }
            },
            error: function() {
                $('#content').html('<p>Erro ao carregar o conteúdo.</p>');
            }
        });
    }

    $('nav a').click(function(e) {
        e.preventDefault();
        let page = $(this).data('page');
        loadPage(page);
    });

    loadPage('inicio');

    function initSlider() {
        let slides = $('.slide');
        let currentIndex = 0;

        setInterval(function() {
            $(slides[currentIndex]).removeClass('active');
            currentIndex = (currentIndex + 1) % slides.length;
            $(slides[currentIndex]).addClass('active');
        }, 3000);
    }
});