document.addEventListener('DOMContentLoaded', () => {
    // Typing Effect
    const textToType = "./welcome.sh --user=jackson";
    const typingElement = document.getElementById('typing-text');
    const introContent = document.getElementById('intro-content');
    let charIndex = 0;

    function typeText() {
        if (charIndex < textToType.length) {
            typingElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 100); // Typing speed
        } else {
            // Show intro content after typing finishes
            setTimeout(() => {
                introContent.classList.remove('hidden');
                introContent.classList.add('visible');
            }, 500);
        }
    }

    // Start typing effect
    setTimeout(typeText, 500);

    // Load Projects
    fetch('data/projects.json')
        .then(response => response.json())
        .then(projects => {
            const projectsContainer = document.getElementById('projects-container');
            projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'project-card';

                const tagsHtml = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

                card.innerHTML = `
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank">[View Project]</a>
                    <div class="tags">${tagsHtml}</div>
                `;
                projectsContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading projects:', error));

    // Load Blog Posts
    fetch('data/blog.json')
        .then(response => response.json())
        .then(posts => {
            const blogContainer = document.getElementById('blog-container');
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'blog-post';

                postElement.innerHTML = `
                    <div class="blog-date">${post.date}</div>
                    <h3>${post.title}</h3>
                    <p>${post.summary}</p>
                    <a href="${post.link}">[Read More]</a>
                `;
                blogContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error loading blog posts:', error));
});
