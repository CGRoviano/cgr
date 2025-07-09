// Audio button play/pause logic for timeline



function setupAudioButtons() {
    // Seleziona tutti i bottoni audio
    var btns = document.querySelectorAll('button[id^="audio-btn-"]');
    btns.forEach(function(btn) {
        var idSuffix = btn.id.replace('audio-btn-', '');
        var audio = document.getElementById('audio-' + idSuffix);
        if(btn && audio) {
            var label = btn.querySelector('.audio-label');
            if (!label) {
                label = document.createElement('span');
                label.className = 'audio-label';
                label.textContent = ' Ascolta la Storia';
                btn.insertBefore(label, btn.firstChild);
            }
            btn.addEventListener('click', function() {
                // Ferma tutti gli altri audio
                document.querySelectorAll('audio').forEach(function(a) {
                    if(a !== audio) {
                        a.pause();
                        a.currentTime = 0;
                    }
                });
                // Aggiorna tutti gli altri bottoni
                document.querySelectorAll('button[id^="audio-btn-"]').forEach(function(otherBtn) {
                    if(otherBtn !== btn) {
                        var otherLabel = otherBtn.querySelector('.audio-label');
                        if(otherLabel) otherLabel.textContent = 'Ascolta la Storia';
                        otherBtn.classList.remove('playing');
                    }
                });
                if(audio.paused){
                    audio.play();
                    btn.classList.add('playing');
                    label.textContent = 'Pausa';
                }else{
                    audio.pause();
                    btn.classList.remove('playing');
                    label.textContent = 'Ascolta la Storia';
                }
            });
            audio.addEventListener('ended', function() {
                btn.classList.remove('playing');
                label.textContent = 'Ascolta la Storia';
            });
        }
    });
}

// Inizializza quando la timeline è caricata dinamicamente
document.addEventListener('timeline-loaded', setupAudioButtons);
window.addEventListener('DOMContentLoaded', setupAudioButtons);
