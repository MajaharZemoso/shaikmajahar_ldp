let localScore = localStorage.getItem('localScore') || 0;
let sessionScore = sessionStorage.getItem('sessionScore') || 0;


document.getElementById('localScore').textContent = localScore;
document.getElementById('sessionScore').textContent = sessionScore;

const button = document.getElementById('increment');

button.addEventListener('click', () => {
    localScore++;
    sessionScore++;

    document.getElementById('localScore').textContent = localScore;
    document.getElementById('sessionScore').textContent = sessionScore;

    localStorage.setItem('localScore', localScore);
    sessionStorage.setItem('sessionScore', sessionScore); 
    
});