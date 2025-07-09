// Audio button play/pause logic for timeline


function setupAudioButton() {
    var btn = document.getElementById('audio-btn-2000');
    var audio = document.getElementById('audio-2000');
    if(btn && audio) {
        // Ensure the button has a label span after the icon
        var label = btn.querySelector('.audio-label');
        if (!label) {
            label = document.createElement('span');
            label.className = 'audio-label';
            label.textContent = ' Ascolta la Storia';
            btn.appendChild(label);
        }
        btn.addEventListener('click', function() {
            if(audio.paused){
                audio.play();
                btn.classList.add('playing');
                label.textContent = ' Pausa';
            }else{
                audio.pause();
                btn.classList.remove('playing');
                label.textContent = ' Ascolta la Storia';
            }
        });
        audio.addEventListener('ended', function() {
            btn.classList.remove('playing');
            label.textContent = ' Ascolta la Storia';
        });
    }
}

// Inizializza quando la timeline è caricata dinamicamente
document.addEventListener('timeline-loaded', setupAudioButton);
// Per fallback, se la timeline fosse già presente al DOMContentLoaded
window.addEventListener('DOMContentLoaded', setupAudioButton);
