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

        // Clear the loading message
        document.getElementById('loading-text').style.display = 'none';

        const repoImages = {
            'C-ATM-Bank': 'img/CSimpleATM.jpg',
            'C-Calculator': 'img/CSimpleCalculator.png',
            'CSharp-Book-Store': 'img/CSharpBookStore.jpg',
            'reactjs-student-form': 'img/reactForm.jpg',
            'TechBooksV3.1': 'img/techbooks.jpg',
            'Unity-DinoPet': 'img/dino.jpg',
            'Unity-Flappy-Blob': 'img/blop.jpg',
            'Unity-FeedThePet': 'img/Feed.png',
        };
        
        repos.forEach(repo => {
            if (repo.name !== 'iamanacarolinarezende.github.io') {  
                const portfolioItem = document.createElement('div');
                portfolioItem.classList.add('portfolio-item', 'py-5', 'border-bottom');
                const repoImage = repoImages[repo.name] || 'img/placeholder.jpg';
        
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
                                <img src="${repoImage}" class="img-fluid" alt="${repo.name}">
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
            }
        });
        
    }

    // Blog function
    document.addEventListener('DOMContentLoaded', function () {
        renderRepos(); // Se necessário, mantenha esta função para outras funcionalidades

        const titles = document.querySelectorAll('.blog-item a.d-inline-block.h4');

        titles.forEach(title => {
            title.addEventListener('click', function (event) {
                event.preventDefault(); // Evita o comportamento padrão do link
                const postTitle = this.textContent.trim(); // Título do post
                let postContent = ''; // Inicializa conteúdo da notícia
                let readMoreLink = ''; // Inicializa link

                switch (postTitle) {
                    case 'Secrets Management Tools in Mobile App Development':
                        postContent = 'In essence, mobile app development’s build and publishing phase requires a dedicated focus on secrets management. By adopting secure practices for handling signing credentials and app store keys, developers can safeguard the integrity of their apps and maintain control over their distribution. This attention to detail ensures that the app reaches its audience through secure, authorized channels, reflecting the overall commitment to security and trustworthiness.';
                        readMoreLink = 'https://medium.com/dopplerhq/secrets-management-for-mobile-app-development-852029582106'; 
                        break;
                    case 'How to Create Quality Figma Design':
                        postContent = "Creating quality designs in Figma involves understanding design principles and mastering the tool's features. This guide provides essential tips, including the importance of user feedback, effective use of components, and organizing layers for better collaboration. By following these best practices, designers can enhance their workflows and produce visually appealing, user-friendly interfaces.";
                        readMoreLink = 'https://help.figma.com/hc/en-us/articles/4405328886935--Beginner-2-Create-designs'; 
                        break;
                    case 'Tutorials for Learning Development':
                        postContent = 'Embarking on your coding journey can be exciting and overwhelming. This guide provides a step-by-step approach to learning coding from scratch. It covers choosing the right programming language, leveraging online resources, setting achievable goals, and practicing regularly. With dedication and the right mindset, you can build a solid foundation and unlock new opportunities in the tech world.';
                        readMoreLink = 'https://daily.dev/blog/beginners-guide-how-to-start-learning-coding-from-scratch'; 
                        break;
                    case 'Free Online Websites to Learn Development':
                        postContent = "Discover the best free resources available online to kickstart your development journey! This guide highlights top websites offering courses, tutorials, and hands-on projects across various programming languages and technologies. Whether you're a complete beginner or looking to enhance your skills, these platforms provide valuable learning opportunities at no cost. Dive in and start building your development skills today!";
                        readMoreLink = 'https://skillcrush.com/blog/64-online-resources-to-learn-to-code-for-free/'; 
                        break;
                    default:
                        postContent = 'Content not available.';
                        readMoreLink = ''; 
                }

                // Modal
                document.getElementById('newsModalLabel').textContent = postTitle;
                document.getElementById('modalBody').innerHTML = `${postContent} <br><a href="${readMoreLink}" class="btn btn-primary mt-3" target="_blank">Read More</a>`; // Use backticks here

                const modal = new bootstrap.Modal(document.getElementById('newsModal'));
                modal.show();
            });
        });
    });
 
})(jQuery);