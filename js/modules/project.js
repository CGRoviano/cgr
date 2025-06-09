// Project Module for animations and interactivity
const ProjectModule = {
    init() {
        document.addEventListener('project-loaded', () => {
            this.cards = document.querySelectorAll('.project-card, .project-main-card');
            this.objectives = document.querySelectorAll('.objective');
            
            this.initAnimations();
            this.initInteractivity();
        });
    },

    initAnimations() {
        // Animate cards on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        // Setup initial state and observe cards
        this.cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease-out';
            observer.observe(card);
        });

        // Setup objectives animation
        this.objectives.forEach((objective, index) => {
            objective.style.opacity = '0';
            objective.style.transform = 'translateX(-20px)';
            objective.style.transition = 'all 0.5s ease-out';
            objective.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(objective);
        });
    },

    initInteractivity() {
        // Add hover effects for cards
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.transition = 'transform 0.3s ease';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    ProjectModule.init();
});