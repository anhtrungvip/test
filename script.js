// ==========================================
// TRUNG TÂM GIẢI TRÍ VÔ TRI 3000™ - JAVASCRIPT
// ==========================================

// --- 1. WEB AUDIO API SYNTHESIZER ---
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.partyLoopId = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPop() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.08);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  playDuck() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.linearRampToValueAtTime(180, now + 0.15);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  playLaser() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(950, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.22);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  playCoin() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    // Note 1
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'square';
    osc1.frequency.setValueAtTime(987.77, now); // B5
    gain1.gain.setValueAtTime(0.25, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.1);

    // Note 2
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(1318.51, now + 0.08); // E6
    gain2.gain.setValueAtTime(0.28, now + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.35);
  }

  playBoing() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(550, now + 0.15);
    osc.frequency.linearRampToValueAtTime(250, now + 0.3);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.32);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.32);
  }

  playBoom() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const dur = 0.5;

    // Buffer tiếng ồn
    const bufferSize = this.ctx.sampleRate * dur;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.linearRampToValueAtTime(40, now + dur);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);
  }

  playMagic() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + idx * 0.07;
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.25);
    });
  }

  playFanfare() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const melody = [
      { f: 523, d: 0.12 },
      { f: 523, d: 0.12 },
      { f: 523, d: 0.12 },
      { f: 659, d: 0.35 },
      { f: 587, d: 0.15 },
      { f: 659, d: 0.15 },
      { f: 784, d: 0.55 },
    ];
    let time = this.ctx.currentTime;
    melody.forEach((note) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(note.f, time);
      gain.gain.setValueAtTime(0.2, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + note.d);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(time);
      osc.stop(time + note.d);
      time += note.d + 0.03;
    });
  }

  startPartyBeat() {
    if (this.partyLoopId) return;
    const chords = [261.63, 329.63, 392.00, 523.25, 440.00, 349.23];
    let step = 0;
    this.partyLoopId = setInterval(() => {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      osc.type = step % 2 === 0 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(chords[step % chords.length], now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
      step++;
    }, 160);
  }

  stopPartyBeat() {
    if (this.partyLoopId) {
      clearInterval(this.partyLoopId);
      this.partyLoopId = null;
    }
  }
}

const sounds = new SoundEngine();
// Khởi tạo AudioContext ngay lần bấm đầu tiên của người dùng
window.addEventListener('pointerdown', () => sounds.init(), { once: true });
window.addEventListener('keydown', () => sounds.init(), { once: true });

// --- 2. CANVAS HIỆU ỨNG PHÁO HOA & VỆT CHUỘT ---
const canvas = document.getElementById('fx-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor(x, y, color, size, vx, vy, isStar = false) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.vx = vx;
    this.vy = vy;
    this.alpha = 1;
    this.decay = Math.random() * 0.025 + 0.015;
    this.gravity = 0.12;
    this.isStar = isStar;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.alpha -= this.decay;
    this.rotation += this.rotSpeed;
  }

  draw(context) {
    context.save();
    context.globalAlpha = Math.max(this.alpha, 0);
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.fillStyle = this.color;

    if (this.isStar) {
      // Vẽ ngôi sao mini
      context.beginPath();
      for (let i = 0; i < 5; i++) {
        context.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * this.size,
                       -Math.sin((18 + i * 72) * Math.PI / 180) * this.size);
        context.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * (this.size / 2),
                       -Math.sin((54 + i * 72) * Math.PI / 180) * (this.size / 2));
      }
      context.closePath();
      context.fill();
    } else {
      context.beginPath();
      context.arc(0, 0, this.size, 0, Math.PI * 2);
      context.fill();
    }
    context.restore();
  }
}

const PALETTE = ['#f43f5e', '#fbbf24', '#38bdf8', '#a855f7', '#34d399', '#f472b6', '#ffffff'];

function createExplosion(x, y, count = 40) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 8 + 2;
    const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    const size = Math.random() * 5 + 3;
    const isStar = Math.random() > 0.4;
    particles.push(new Particle(
      x, y, color, size,
      Math.cos(angle) * speed,
      Math.sin(angle) * speed,
      isStar
    ));
  }
}

// Loop render hạt
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.draw(ctx);
    if (p.alpha <= 0) {
      particles.splice(i, 1);
    }
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Vệt hạt theo chuột
let lastMousePos = { x: 0, y: 0 };
window.addEventListener('mousemove', (e) => {
  const dist = Math.hypot(e.clientX - lastMousePos.x, e.clientY - lastMousePos.y);
  if (dist > 15) {
    lastMousePos = { x: e.clientX, y: e.clientY };
    const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    particles.push(new Particle(
      e.clientX, e.clientY, color, Math.random() * 4 + 2,
      (Math.random() - 0.5) * 1.5,
      (Math.random() - 0.5) * 1.5 - 0.5,
      true
    ));
  }
});

// Click bất kỳ đâu -> Pháo hoa nổ
window.addEventListener('click', (e) => {
  // Chỉ nổ nếu không bấm vào các nút điều khiển chính để tránh lag
  createExplosion(e.clientX, e.clientY, 25);
});

// Floating number animation khi click vị trí bất kỳ
function spawnFloatingText(x, y, text) {
  const el = document.createElement('div');
  el.className = 'float-num';
  el.innerText = text;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 800);
}

// --- 3. THẺ 1: NÚT CHẠY TRỐN (RUNAWAY BUTTON) ---
const runawayBtn = document.getElementById('runaway-btn');
const runawayContainer = document.getElementById('runaway-container');
const runawayTaunt = document.getElementById('runaway-taunt');

const taunts = [
  'Lêu lêu bấm hụt rồi! 😜',
  'Tay chậm hơn não rùi kìa! 🏃💨',
  'Tuổi gì bắt được tui! 😎',
  'Gần trúng rồi... đùa đấy! 🤡',
  'Thôi bỏ cuộc đi bạn êi! 😂',
  'Nhanh tay lên xem nào! ⚡',
  'U là trời né mượt ghê! 🚀',
  'Nữa đi cưng! 🔥'
];

let missCount = 0;

function moveRunawayBtn() {
  const containerRect = runawayContainer.getBoundingClientRect();
  const btnRect = runawayBtn.getBoundingClientRect();

  const maxX = containerRect.width - btnRect.width - 20;
  const maxY = containerRect.height - btnRect.height - 20;

  const randX = Math.max(10, Math.floor(Math.random() * maxX));
  const randY = Math.max(10, Math.floor(Math.random() * maxY));

  runawayBtn.style.left = `${randX}px`;
  runawayBtn.style.top = `${randY}px`;

  missCount++;
  runawayTaunt.innerText = `${taunts[Math.floor(Math.random() * taunts.length)]} (Hụt ${missCount} lần)`;
  sounds.playBoing();
}

// Kiểm tra khoảng cách chuột tới nút
runawayContainer.addEventListener('mousemove', (e) => {
  const btnRect = runawayBtn.getBoundingClientRect();
  const btnCenterX = btnRect.left + btnRect.width / 2;
  const btnCenterY = btnRect.top + btnRect.height / 2;

  const distance = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

  if (distance < 75) {
    moveRunawayBtn();
  }
});

// Bấm trúng nút (bằng mẹo hoặc bấm nhanh)
runawayBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  sounds.playFanfare();
  createExplosion(e.clientX, e.clientY, 80);
  runawayTaunt.innerText = '🏆 BÁ ĐẠO! Bạn đã bắt được nút! Bàn tay vàng trong làng bắt nút! 🎉';
  runawayBtn.innerText = 'ĐÃ BỊ BẮT! 👑';
  setTimeout(() => {
    runawayBtn.innerText = 'CẤM BẤM! 🚫';
  }, 3000);
});

// Đặt vị trí ban đầu cho nút giữa khung
function resetRunawayPosition() {
  runawayBtn.style.position = 'absolute';
  runawayBtn.style.left = 'calc(50% - 65px)';
  runawayBtn.style.top = 'calc(50% - 24px)';
}
resetRunawayPosition();
window.addEventListener('load', resetRunawayPosition);

// --- 4. THẺ 2: MÁY BẤM CHUỘT XẢ GIẬN (CLICKER) ---
const duckBtn = document.getElementById('duck-btn');
const clickCountDisplay = document.getElementById('click-count');
const playerRank = document.getElementById('player-rank');
const btnAutoclick = document.getElementById('btn-autoclick');
const btnResetClicks = document.getElementById('btn-reset-clicks');

let clicks = 0;
let autoClickActive = false;

const RANKS = [
  { min: 0, title: 'Tập Sự Vô Tri 🌱' },
  { min: 10, title: 'Bấm Chuột Nghiệp Dư 🥉' },
  { min: 30, title: 'Ngón Tay Điêu Luyện 🥈' },
  { min: 70, title: 'Phù Thủy Spam Phím 🥇' },
  { min: 150, title: 'Chiến Thần Đập Chuột 🔥' },
  { min: 300, title: 'Chúa Tể Vô Tri Tối Thượng 👑' }
];

function updateRank() {
  let currentRank = RANKS[0].title;
  for (let r of RANKS) {
    if (clicks >= r.min) currentRank = r.title;
  }
  playerRank.innerText = `Danh hiệu: ${currentRank}`;
}

function handleDuckClick(e, amount = 1) {
  clicks += amount;
  clickCountDisplay.innerText = clicks;
  updateRank();

  sounds.playDuck();

  const rect = duckBtn.getBoundingClientRect();
  const x = e ? e.clientX : rect.left + rect.width / 2;
  const y = e ? e.clientY : rect.top;

  spawnFloatingText(x, y, `+${amount}`);
  createExplosion(x, y, 10);

  // Hiệu ứng nhún
  duckBtn.style.transform = `scale(${Math.random() * 0.2 + 0.85}) rotate(${(Math.random() - 0.5) * 20}deg)`;
  setTimeout(() => {
    duckBtn.style.transform = 'scale(1) rotate(0deg)';
  }, 100);
}

duckBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  handleDuckClick(e, 1);
});

// Auto-clicker
btnAutoclick.addEventListener('click', (e) => {
  e.stopPropagation();
  if (autoClickActive) return;
  autoClickActive = true;
  btnAutoclick.innerText = '⚡ ĐANG TỰ BẤM...';
  sounds.playCoin();

  let elapsed = 0;
  const interval = setInterval(() => {
    handleDuckClick(null, 2);
    elapsed += 100;
    if (elapsed >= 5000) {
      clearInterval(interval);
      autoClickActive = false;
      btnAutoclick.innerText = '⚡ Bật Auto-Click (5s)';
    }
  }, 100);
});

btnResetClicks.addEventListener('click', (e) => {
  e.stopPropagation();
  clicks = 0;
  clickCountDisplay.innerText = clicks;
  updateRank();
  sounds.playBoom();
});

// --- 5. THẺ 3: SOUNDBOARD DJ 8-BIT ---
const soundPads = document.querySelectorAll('.sound-pad');
soundPads.forEach((pad) => {
  pad.addEventListener('click', (e) => {
    e.stopPropagation();
    const soundType = pad.getAttribute('data-sound');
    
    pad.classList.add('playing');
    setTimeout(() => pad.classList.remove('playing'), 200);

    const rect = pad.getBoundingClientRect();
    createExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2, 15);

    switch (soundType) {
      case 'duck': sounds.playDuck(); break;
      case 'laser': sounds.playLaser(); break;
      case 'coin': sounds.playCoin(); break;
      case 'boing': sounds.playBoing(); break;
      case 'boom': sounds.playBoom(); break;
      case 'magic': sounds.playMagic(); break;
    }
  });
});

// --- 6. THẺ 4: QUẢ CẦU TIÊN TRI 8-BALL ---
const magicBall = document.getElementById('magic-ball');
const ballCenter = document.getElementById('ball-center');
const oracleInput = document.getElementById('oracle-question');
const oracleBtn = document.getElementById('oracle-btn');
const oracleText = document.getElementById('oracle-text');

const ORACLE_ANSWERS = [
  'Vũ trụ bảo: Đi ngủ đi bạn êi! 😴',
  'Tỷ lệ thành công là 0.0001%, nhưng cố lên! 💪',
  'Hôm nay tuyệt đối không nên vay tiền ai cả! 💸',
  'Nghe theo con tim đi, nhưng chuẩn bị sẵn khăn giấy! 😭',
  'Hỏi câu gì thông minh hơn xem nào? 🗿',
  'Chắc chắn 100%... là không rồi! ❌',
  'Có trời mới biết được bạn đang nghĩ gì! 🤷‍♂️',
  'Ăn một bát mì tôm là giải quyết được hết! 🍜',
  'Vũ trụ đang bận gội đầu, tí hỏi lại sau nhé! 🛁',
  'Nếu bạn tin vào bản thân, thì... bạn nhầm rồi! 🤡',
  'Tương lai sáng sủa như đèn pha ô tô! ✨',
  'Làm luôn đi, sai thì... sửa, chửa thì đẻ! 🚀',
  'Bí mật quân sự, không tiết lộ được đâu! 🤫',
  'Triệu phần trăm là CÓ! Chiến thôi! 🔥',
  'Đừng suy nghĩ nhiều, cuộc đời này làm gì có đáp án! 🧘'
];

function consultOracle() {
  sounds.playMagic();
  magicBall.classList.add('shake');
  ballCenter.innerText = '🌀';
  oracleText.innerText = 'Vũ trụ đang suy nghĩ...';

  setTimeout(() => {
    magicBall.classList.remove('shake');
    const randomAns = ORACLE_ANSWERS[Math.floor(Math.random() * ORACLE_ANSWERS.length)];
    ballCenter.innerText = '🎱';
    oracleText.innerText = randomAns;
    const rect = magicBall.getBoundingClientRect();
    createExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
  }, 600);
}

oracleBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  consultOracle();
});

magicBall.addEventListener('click', (e) => {
  e.stopPropagation();
  consultOracle();
});

oracleInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') consultOracle();
});

// --- 7. THẺ 5: BỂ BONG BÓNG POP-IT ---
const bubbleGrid = document.getElementById('bubble-grid');
const btnResetBubbles = document.getElementById('btn-reset-bubbles');

function createBubbles() {
  bubbleGrid.innerHTML = '';
  for (let i = 0; i < 24; i++) {
    const bubble = document.createElement('button');
    bubble.className = 'bubble';
    bubble.title = 'Bụp!';
    bubble.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!bubble.classList.contains('popped')) {
        bubble.classList.add('popped');
        sounds.playPop();
        const rect = bubble.getBoundingClientRect();
        createExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2, 10);

        // Kiểm tra nổ hết chưa
        const remaining = document.querySelectorAll('.bubble:not(.popped)').length;
        if (remaining === 0) {
          setTimeout(() => {
            sounds.playFanfare();
            createExplosion(window.innerWidth / 2, window.innerHeight / 2, 80);
          }, 150);
        }
      }
    });
    bubbleGrid.appendChild(bubble);
  }
}
createBubbles();

btnResetBubbles.addEventListener('click', (e) => {
  e.stopPropagation();
  sounds.playBoing();
  createBubbles();
});

// --- 8. THẺ 6: MEME & TRIẾT LÝ CUỘC ĐỜI ---
const memeEmoji = document.getElementById('meme-emoji');
const memeQuote = document.getElementById('meme-quote');
const btnNextMeme = document.getElementById('btn-next-meme');

const MEMES = [
  { emoji: '🗿', quote: '"Nếu bạn không thể làm việc lớn... thì hãy đi ngủ!"' },
  { emoji: '🦆', quote: '"Người không vì mình trời tru đất diệt, người vì mình quá thiên hạ ghét!"' },
  { emoji: '🤡', quote: '"Đừng buồn vì bạn xấu, hãy vui vì bạn còn nghèo nữa!"' },
  { emoji: '🦥', quote: '"Đừng bao giờ từ bỏ ước mơ... hãy tắt báo thức và ngủ tiếp!"' },
  { emoji: '🚀', quote: '"Có công mài sắt... có ngày mỏi tay!"' },
  { emoji: '🧘', quote: '"Mọi chuyện rồi cũng sẽ qua... chỉ có nợ là ở lại!"' },
  { emoji: '🐱', quote: '"Nếu người ta bảo bạn lười, hãy chứng minh bằng cách không thèm cãi!"' },
  { emoji: '🍕', quote: '"Tiền không mua được tất cả, nhưng mua được trà sữa và pizza!"' },
  { emoji: '🔥', quote: '"Cái gì không giải quyết được bằng tiền, sẽ giải quyết được bằng rất nhiều tiền!"' }
];

let memeIndex = 0;
btnNextMeme.addEventListener('click', (e) => {
  e.stopPropagation();
  sounds.playCoin();
  memeIndex = (memeIndex + 1) % MEMES.length;
  memeEmoji.innerText = MEMES[memeIndex].emoji;
  memeQuote.innerText = MEMES[memeIndex].quote;
  memeEmoji.style.transform = 'scale(1.3) rotate(15deg)';
  setTimeout(() => {
    memeEmoji.style.transform = 'scale(1) rotate(0deg)';
  }, 200);
});

// --- 9. TOP CONTROLS ---

// Party Mode (Quẩy Disco)
const btnParty = document.getElementById('btn-party');
let partyActive = false;
let partyConfettiInterval = null;

btnParty.addEventListener('click', (e) => {
  e.stopPropagation();
  partyActive = !partyActive;
  if (partyActive) {
    document.body.classList.add('party-mode');
    btnParty.classList.add('active');
    sounds.startPartyBeat();
    // Bắn pháo hoa liên tục
    partyConfettiInterval = setInterval(() => {
      createExplosion(Math.random() * window.innerWidth, Math.random() * (window.innerHeight * 0.7), 20);
    }, 400);
  } else {
    document.body.classList.remove('party-mode');
    btnParty.classList.remove('active');
    sounds.stopPartyBeat();
    clearInterval(partyConfettiInterval);
  }
});

// Âm thanh bật / tắt
const btnSound = document.getElementById('btn-sound');
const soundIcon = document.getElementById('sound-icon');
const soundStatus = document.getElementById('sound-status');

btnSound.addEventListener('click', (e) => {
  e.stopPropagation();
  sounds.enabled = !sounds.enabled;
  if (sounds.enabled) {
    sounds.init();
    soundIcon.innerText = '🔊';
    soundStatus.innerText = 'BẬT';
    sounds.playCoin();
  } else {
    soundIcon.innerText = '🔇';
    soundStatus.innerText = 'TẮT';
    sounds.stopPartyBeat();
  }
});

// Bắn Pháo Hoa Ngay
const btnFireworks = document.getElementById('btn-fireworks');
btnFireworks.addEventListener('click', (e) => {
  e.stopPropagation();
  sounds.playFanfare();
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      createExplosion(
        Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1,
        Math.random() * window.innerHeight * 0.6 + 100,
        50
      );
    }, i * 200);
  }
});

// Rung Lắc Màn Hình (Động Đất)
const btnGravity = document.getElementById('btn-gravity');
btnGravity.addEventListener('click', (e) => {
  e.stopPropagation();
  sounds.playBoom();
  document.body.style.animation = 'shake-ball 0.1s infinite';
  setTimeout(() => {
    document.body.style.animation = '';
  }, 1200);
});
