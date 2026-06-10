// Infinite horizontal logo strip scroll, seamless, any number of logos
document.addEventListener('DOMContentLoaded', function () {
    const strip = document.getElementById('logo-strip');
    if (!strip) return;

    // Duplicate logos twice for smoother loop
    const originalLogos = Array.from(strip.children);
    for (let i = 0; i < 2; i++) {
        originalLogos.forEach(logo => {
            const clone = logo.cloneNode(true);
            strip.appendChild(clone);
        });
    }

    let animationFrame;
    let lastTime = performance.now();
    const speed = 0.05; // pixels per millisecond

    function animate(currentTime) {
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;

        const currentTransform = getComputedStyle(strip).transform;
        let currentX = 0;
        if (currentTransform !== 'none') {
            const matrix = new DOMMatrix(currentTransform);
            currentX = matrix.m41;
        }

        // Calculate new position
        let newX = currentX - (speed * deltaTime);
        
        // Get the width of one set of logos
        const singleSetWidth = originalLogos.reduce((total, logo) => {
            return total + logo.offsetWidth + parseInt(getComputedStyle(strip).gap || 0);
        }, 0);

        // Reset position when we've scrolled one full set
        if (Math.abs(newX) >= singleSetWidth) {
            newX = 0;
        }

        strip.style.transform = `translateX(${newX}px)`;
        animationFrame = requestAnimationFrame(animate);
    }

    // Wait for all images to load before starting animation
    Promise.all(
        Array.from(strip.querySelectorAll('img')).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => {
                img.onload = resolve;
                img.onerror = resolve;
            });
        })
    ).then(() => {
        strip.style.visibility = 'visible';
        animationFrame = requestAnimationFrame(animate);
    });

    // Pause animation when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationFrame);
        } else {
            lastTime = performance.now();
            animationFrame = requestAnimationFrame(animate);
        }
    });
});