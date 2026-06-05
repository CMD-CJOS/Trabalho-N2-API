$(document).ready(function() {
    function loadPage(page) {
        $.ajax({
            url: 'pages/' + page + '.html',
            method: 'GET',
            success: function(data) {
                $('#content').html(data);
                if (page === 'inicio') {
                    initSlider();
                } else if (page === 'blog') {
                    loadPosts();
                } else if (page === 'quem-somos') {
                    loadCurriculo();
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

    function loadPosts() {
        $.ajax({
            url: '/api/posts',
            method: 'GET',
            success: function(posts) {
                let html = '';
                posts.forEach(function(post) {
                    html += '<div class="post-card">';
                    html += '<img src="' + post.image_url + '" alt="' + post.title + '">';
                    html += '<h3>' + post.title + '</h3>';
                    html += '<p>' + post.content + '</p>';
                    html += '</div>';
                });
                $('#blog-grid').html(html);
            },
            error: function() {
                $('#blog-grid').html('<p>Erro ao carregar os posts do banco de dados.</p>');
            }
        });
    }

    function loadCurriculo() {
        $.ajax({
            url: '/api/curriculo',
            method: 'GET',
            success: function(dados) {
                if (dados && dados.length > 0) {
                    let html = '';
                    dados.forEach(function(item) {
                        html += '<div class="curriculo-card">';
                        html += '<img src="' + item.imagem_url + '" alt="Foto Perfil" class="foto-perfil">';
                        html += '<h3>' + item.nome + '</h3>';
                        html += '<h4>' + item.cargo + '</h4>';
                        html += '<p>' + item.descricao + '</p>';
                        
                        if (item.pdf_url) {
                            html += '<a href="' + item.pdf_url + '" target="_blank" class="btn-download">📄 Baixar Currículo</a>';
                        }
                        
                        html += '</div>';
                    });
                    $('#curriculo-grid').html(html);
                }
            },
            error: function() {
                $('#curriculo-grid').html('<p>Erro ao carregar os currículos do banco de dados.</p>');
            }
        });
    }
});