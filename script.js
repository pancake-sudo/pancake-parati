const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const matrixChars = "012#%!#$%$#53456789!$%$&/#/!#%!#$%$#5613451345#%!$#%!#$%";
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

let matrixInterval = setInterval(drawMatrix, 50);
let hintInterval; 

const hints = [
    "Pista: Apodo de mi persona favorita...",
    "Pista: Te gusta mucho...",
    "Contraseña: Blanco"
];
let hintIndex = 0;

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ff1493";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    drops[i]++;
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
  }
}

function reproducirMusica() {
  const audio = document.getElementById("musica");
  if (audio) {
    console.log("Reproduciendo música...");
    audio.play(); // Reproduce el archivo MP3
    mostrarPantalla("candado");

    const pistaElement = document.getElementById("pista-texto");
    if (hintInterval) clearInterval(hintInterval);

    pistaElement.innerText = hints[hintIndex];
    hintInterval = setInterval(() => {
      hintIndex = (hintIndex + 1) % hints.length;
      pistaElement.innerText = hints[hintIndex];
    }, 3000);
  } else {
    alert("El reproductor no está listo. Intenta nuevamente.");
  }
}

function verificar() {
  const pass = document.getElementById("password").value.trim();
  if (pass === "Snoopy") {
    clearInterval(matrixInterval);
    clearInterval(hintInterval); 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    mostrarPantalla("carga");
    const barra = document.querySelector(".barra-carga > div");
    barra.style.width = "0%";
    barra.style.animation = "llenar 2s linear forwards";
    setTimeout(() => {
      mostrarCarta();
    }, 2000);
  } else {
    alert("Contraseña incorrecta 💔");
  }
}

function mostrarPantalla(id) {
  document.querySelectorAll(".pantalla").forEach(p => p.classList.remove("visible"));
  document.getElementById(id).classList.add("visible");
}

function mostrarCarta() {
  mostrarPantalla("carta");
  setInterval(() => {
    for (let i = 0; i < 20; i++) {
      const texto = document.createElement("div");
      texto.className = "teAmoMatrix";
      texto.innerText = "Te amo ❤️";
      texto.style.left = Math.random() * 100 + "vw";
      texto.style.top = "-30px";
      texto.style.fontSize = Math.random() * 18 + 14 + "px";
      texto.style.opacity = Math.random() * 0.4 + 0.3;
      texto.style.animationDuration = (Math.random() * 4 + 4) + "s";
      document.body.appendChild(texto);
      setTimeout(() => texto.remove(), 10000);
    }
  }, 2000);
}