(function ($) {
    "use strict";

    // Initiate the WOW.js
    new WOW().init();

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 5,
        time: 2000
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Repositories from GitHub
    async function fetchGitHubRepos() {
        const url = `https://api.github.com/users/iamanacarolinarezende/repos`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const repos = await response.json();
            return repos;
        } catch (error) {
            console.error('Error fetching repos:', error);
            return [];
        }
    }

    async function renderRepos() {
        const repos = await fetchGitHubRepos();
        const portfolioContent = document.querySelector('.portfolio-content'); // portfólio section

        // Limpa a mensagem de carregamento
        document.getElementById('loading-text').style.display = 'none';

        repos.forEach(repo => {
            const portfolioItem = document.createElement('div');
            portfolioItem.classList.add('portfolio-item', 'py-5', 'border-bottom');

            portfolioItem.innerHTML = `
                <div class="row g-4 align-items-center">
                    <div class="col-xl-6">
                        <h4 class="text-body">${repo.language || 'N/A'}</h4>
                        <h1 class="display-6 mb-0">${repo.name}</h1>
                        <p class="mb-4">${repo.description || 'No description available.'}</p>
                    </div>
                    <div class="col-9 col-xl-4">
                        <div class="portfolio-img">
                            <div class="portfolio-img-inner">
                                <img src="img/placeholder.jpg" class="img-fluid" alt="Image">
                            </div>
                        </div>
                    </div>
                    <div class="col-3 col-xl-2">
                        <div class="view-img">
                            <a href="${repo.html_url}" target="_blank" class="btn btn-primary btn-lg-square">
                                <i class="fas fa-plus"></i>
                            </a>
                        </div>
                    </div> 
                </div>
            `;
            
            portfolioContent.appendChild(portfolioItem);
        });
    }

    // Chama a função renderRepos quando o DOM estiver completamente carregado
    document.addEventListener('DOMContentLoaded', renderRepos);
})(jQuery);