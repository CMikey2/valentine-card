const cta = document.getElementById('cta');
const question = document.getElementById('question');
const yes = document.getElementById('yes');
const no = document.getElementById('no');
const result = document.getElementById('result');

const bgm = document.getElementById('bgm');
const musicBtn = document.getElementById('musicBtn');

let musicOn = false;

cta.addEventListener('click', async () => {
  question.classList.remove('hidden');
  musicBtn.classList.remove('hidden');

  cta.disabled = true;
  cta.textContent = 'opened 💗';

  // iPhone + modern browsers: audio must start only after a user interaction (this click qualifies)
  // We try to start softly; if blocked, the button still works.
  tryStartMusic();
});

musicBtn.addEventListener('click', () => {
  if (!musicOn) {
    bgm.play().then(() => {
      musicOn = true;
      musicBtn.textContent = '🔊 music: on';
    }).catch(() => {
      // If it fails, user can click again or file path might be wrong.
      musicBtn.textContent = '🔊 tap again (music blocked)';
    });
  } else {
    bgm.pause();
    musicOn = false;
    musicBtn.textContent = '🔊 music: off';
  }
});

function tryStartMusic(){
  bgm.volume = 0.35;
  bgm.play().then(() => {
    musicOn = true;
    musicBtn.textContent = '🔊 music: on';
  }).catch(() => {
    musicOn = false;
    musicBtn.textContent = '🔊 music: off';
  });
}

yes.addEventListener('click', () => {
  result.textContent = "You Know Better, I love You😘";
  confettiBurst();
});

let dodge = 0;
no.addEventListener('mouseenter', () => {
  // playful “can’t click no”
  dodge++;
  const maxMove = 140;
  const x = (Math.random() * maxMove * 2) - maxMove;
  const y = (Math.random() * maxMove * 1.4) - maxMove * 0.7;
  no.style.transform = `translate(${x}px, ${y}px)`;

  if (dodge >= 3) no.textContent = "okay okay 😭";
});

no.addEventListener('click', () => {
  result.textContent = "Count ya days💀";
});

function confettiandfireworksBurst() {
  for (let i = 0; i < 120; i++) {
    const d = document.createElement('div');
    d.style.position = 'fixed';
    d.style.left = (window.innerWidth / 2) + 'px';
    d.style.top = (window.innerHeight / 2) + 'px';
    d.style.width = '8px';
    d.style.height = '10px';
    d.style.background = `hsl(${Math.random()*360}, 90%, 70%)`;
    d.style.opacity = '0.95';
    d.style.borderRadius = '2px';
    d.style.transform = 'translate(-50%, -50%)';
    d.style.zIndex = '9999';
    document.body.appendChild(d);

    const angle = Math.random() * Math.PI * 2;
    const dist = 120 + Math.random() * 220;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;

    d.animate([
      { transform: 'translate(-50%, -50%) translate(0,0) rotate(0deg)', opacity: 1 },
      { transform: `translate(-50%, -50%) translate(${dx}px, ${dy}px) rotate(${Math.random()*720}deg)`, opacity: 0 }
    ], { duration: 1100 + Math.random()*600, easing: 'cubic-bezier(.2,.8,.2,1)' });

    setTimeout(() => d.remove(), 1800);
  }
}
