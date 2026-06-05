$(document).ready(function() {
    
    function carregarPagina(pagina) {
        $.ajax({
            url: `pages/${pagina}.html`,
            method: 'GET',
            success: function(data) {
                $('#conteudo-principal').html(data);
                
                if(pagina === 'blog') {
                    carregarPosts();
                }
            },
            error: function() {
                $('#conteudo-principal').html('<p>Erro ao carregar a página.</p>');
            }
        });
    }

    $('nav a').click(function(e) {
        e.preventDefault();
        const pagina = $(this).data('page');
        carregarPagina(pagina);
    });

    carregarPagina('inicio');

    function carregarPosts() {
        $.get('/api/posts', function(posts) {
            let html = '<div class="grid-posts">';
            posts.forEach(post => {
                html += `
                    <div class="post-card">
                        <img src="${post.image_url}" alt="${post.title}">
                        <h3>${post.title}</h3>
                        <p>${post.content}</p>
                    </div>
                `;
            });
            html += '</div>';
            $('#container-posts').html(html);
        });
    }
});