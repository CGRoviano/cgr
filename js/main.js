// Main JavaScript file
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing application...');
    
    // Initialize Timeline Module
    if (typeof TimelineModule !== 'undefined') {
        TimelineModule.init();
    }
    
    // Initialize Project Module
    if (typeof ProjectModule !== 'undefined') {
        ProjectModule.init();
    }
});