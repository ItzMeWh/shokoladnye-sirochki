const windows = document.querySelectorAll('[data-window]');

windows.forEach((windowElement) => {
  const closeButton = windowElement.querySelector('[data-close]');
  const minimizeButton = windowElement.querySelector('[data-minimize]');

  closeButton?.addEventListener('click', () => {
    windowElement.classList.add('is-closed');
  });

  minimizeButton?.addEventListener('click', () => {
    windowElement.classList.toggle('is-minimized');
  });
});

const audioButton = document.getElementById('audio-toggle');
let audioContext;
let oscillator;

function toggleVhsHum() {
  if (!audioContext || audioContext.state === 'closed') {
    audioContext = new window.AudioContext();
  }

  if (oscillator) {
    oscillator.stop();
    oscillator.disconnect();
    oscillator = null;
    audioButton.textContent = '▶ START VHS HUM';
    return;
  }

  oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = 'sawtooth';
  oscillator.frequency.value = 58;
  gain.gain.value = 0.008;

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  audioButton.textContent = '■ STOP VHS HUM';
}

audioButton?.addEventListener('click', toggleVhsHum);
