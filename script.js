document.addEventListener("DOMContentLoaded", () => {
  const telaInicial = document.getElementById("tela-inicial");
  const telaJogo = document.getElementById("tela-jogo");
  const telaNao = document.getElementById("tela-nao");
  const telaDerrota = document.getElementById("tela-derrota");
  const telaParabens = document.getElementById("tela-parabens");
  const btnSim = document.getElementById("btn-sim");
  const btnNao = document.getElementById("btn-nao");
  const btnJogarNovamente = document.getElementById("btn-jogar-novamente");
  const mensagemJogo = document.getElementById("mensagem-jogo");
  const containerCartas = document.getElementById("container-cartas");

  const imagens = {
    verso: "Virada-pra-baixo.webp",
    milenar: "Dragao-Milenar.webp",
    baby: "Baby-Dragon.webp",
    mago: "Mago-do-Tempo.webp",
    capture: "Dragon-Capture.webp",
    kkk: "Virada-pra-baixo-kkk.webp",
    perdedor: "Perdedor.png",
    parabens: "Parabens.webp"
  };

  // -------- Eventos Sim/Não --------
  btnSim.addEventListener("click", () => {
    telaInicial.classList.add("escondida");
    telaJogo.classList.remove("escondida");
    nivel1();
  });

  btnNao.addEventListener("click", () => {
    telaInicial.classList.add("escondida");
    telaNao.classList.remove("escondida");
  });

  btnJogarNovamente.addEventListener("click", () => {
    telaDerrota.classList.add("escondida");
    telaJogo.classList.remove("escondida");
    nivel1();
  });

  // -------- Função auxiliar --------
  function criarCarta(src) {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("carta");
    return img;
  }

  // -------- Nível 1 --------
  function nivel1() {
    mensagemJogo.textContent = "Escolha entre 2 cartas:";
    containerCartas.innerHTML = "";
    for (let i = 0; i < 2; i++) {
      const carta = criarCarta(imagens.verso);
      carta.addEventListener("click", () => {
        carta.src = imagens.milenar;
        carta.classList.add("selecionada");
        setTimeout(() => {
          carta.classList.remove("selecionada");
          nivel2();
        }, 1000);
      });
      containerCartas.appendChild(carta);
    }
  }

  // -------- Nível 2 --------
  function nivel2() {
    mensagemJogo.textContent = "Muito bem, mas vamos dificultar um pouco.\nEscolha entre 3 cartas:";
    containerCartas.innerHTML = "";
    const cartas = [imagens.milenar, imagens.milenar, imagens.baby].sort(() => Math.random() - 0.5);

    cartas.forEach((img) => {
      const carta = criarCarta(imagens.verso);
      carta.addEventListener("click", () => {
        carta.src = img;
        carta.classList.add("selecionada");
        setTimeout(() => {
          carta.classList.remove("selecionada");
          if (img === imagens.milenar) {
            mensagemJogo.textContent = "Okay, estava fácil demais, agora você pode prender o dragão antes mesmo de encontrar ele.";
            nivel3();
          } else {
            carta.classList.add("topo");
            mensagemJogo.textContent = "Você encontrou o Baby Dragon!";
            containerCartas.innerHTML = "";
            containerCartas.appendChild(carta);
            setTimeout(() => calma1(carta), 1000);
          }
        }, 1000);
      });
      containerCartas.appendChild(carta);
    });
  }

  // -------- Calma1 --------
  function calma1(babyCarta) {
    mensagemJogo.textContent =
      "Calma, você não perdeu ainda! Confia aí nesse tal do coração das cartas e vê se acha o Mago do Tempo!\nEscolha entre duas cartas:";
    const containerDuelo = document.createElement("div");
    containerDuelo.classList.add("duelo");
    const opcoes = [imagens.mago, imagens.capture].sort(() => Math.random() - 0.5);

    opcoes.forEach((img) => {
      const carta = criarCarta(imagens.verso);
      carta.addEventListener("click", () => {
        carta.src = img;
        carta.classList.add("selecionada");
        setTimeout(() => {
          carta.classList.remove("selecionada");
          if (img === imagens.mago) {
            babyCarta.classList.add("fusao");
            babyCarta.src = imagens.milenar;
            setTimeout(() => babyCarta.classList.remove("fusao"), 1000);
            setTimeout(() => nivel3(), 1000);
          } else {
            carta.style.animation = "desaparecer 1s forwards";
            babyCarta.style.animation = "desaparecer 1s forwards";
            setTimeout(() => derrota(), 1000);
          }
        }, 1000);
      });
      containerDuelo.appendChild(carta);
    });

    containerCartas.appendChild(babyCarta);
    containerCartas.appendChild(containerDuelo);
  }

  // -------- Nível 3 --------
  function nivel3() {
  mensagemJogo.textContent = "Okay, estava fácil demais, agora você pode prender o dragão antes mesmo de encontrar ele.\nEscolha entre 4 cartas:";
  containerCartas.innerHTML = "";
  const cartas = [imagens.milenar, imagens.milenar, imagens.baby, imagens.capture].sort(() => Math.random() - 0.5);

  cartas.forEach((img) => {
    const carta = criarCarta(imagens.verso);
    carta.addEventListener("click", () => {
      carta.src = img;
      carta.classList.add("selecionada");

      setTimeout(() => {
        carta.classList.remove("selecionada");

        if (img === imagens.milenar) {
          // Acertou o Dragão Milenar
          mensagemJogo.textContent = "Você avançou para o próximo nível!";
          nivel4();

        } else if (img === imagens.baby) {
          // Achou o Baby Dragon
          mensagemJogo.textContent = "Você encontrou o Baby Dragon!";
          carta.classList.add("topo");
          containerCartas.innerHTML = "";
          containerCartas.appendChild(carta);

          // Mostra por 1 segundo e vai para o calma2
          setTimeout(() => calma2(carta), 1000);

        } else {
          // Dragon Capture → Derrota
          carta.style.animation = "desaparecer 1s forwards";
          setTimeout(() => derrota(), 1000);
        }
      }, 1000);
    });
    containerCartas.appendChild(carta);
  });
}


  // -------- Calma2 --------
  function calma2(babyCarta) {
    containerCartas.innerHTML = "";
    babyCarta.classList.add("topo");
    containerCartas.appendChild(babyCarta);
    mensagemJogo.textContent = "Calma, você não perdeu ainda! Confia aí nesse tal do coração das cartas e vê se acha o Mago do Tempo!\nEscolha entre 4 cartas (2 Magos do Tempo e 2 Dragon Capture):";

    const cartasDuelo = [imagens.mago, imagens.mago, imagens.capture, imagens.capture].sort(() => Math.random() - 0.5);
    const containerDuelo = document.createElement("div");
    containerDuelo.classList.add("duelo");

    cartasDuelo.forEach((img) => {
      const carta = criarCarta(imagens.verso);
      carta.addEventListener("click", () => {
        carta.src = img;
        carta.classList.add("selecionada");
        setTimeout(() => {
          carta.classList.remove("selecionada");
          if (img === imagens.mago) {
            babyCarta.classList.add("fusao");
            babyCarta.src = imagens.milenar;
            setTimeout(() => babyCarta.classList.remove("fusao"), 1000);
            setTimeout(() => nivel4(), 1000);
          } else {
            carta.style.animation = "desaparecer 1s forwards";
            babyCarta.style.animation = "desaparecer 1s forwards";
            setTimeout(() => derrota(), 1000);
          }
        }, 1000);
      });
      containerDuelo.appendChild(carta);
    });

    containerCartas.appendChild(containerDuelo);
  }

  // -------- Nível 4 --------
  function nivel4() {
    mensagemJogo.textContent = "Você chegou no nível final, vamos ver se era só sorte ou se realmente tava acreditando no coração das cartas.";
    containerCartas.innerHTML = "";

    const cartas = [imagens.milenar, imagens.baby, imagens.capture, imagens.capture, imagens.kkk].sort(() => Math.random() - 0.5);

    cartas.forEach((img) => {
      const carta = criarCarta(imagens.verso);
      carta.addEventListener("click", () => {
        carta.src = img;
        carta.classList.add("selecionada");
        setTimeout(() => {
          carta.classList.remove("selecionada");
          if (img === imagens.milenar) {
            parabens();
          } else if (img === imagens.baby) {
            mensagemJogo.textContent = "Você encontrou o Baby Dragon!";
          carta.classList.add("topo");
          containerCartas.innerHTML = "";
          containerCartas.appendChild(carta);
            setTimeout(() => calma3(carta), 1000);
          } else if (img === imagens.capture) {
            carta.style.animation = "desaparecer 1s forwards";
            setTimeout(() => derrota(), 1000);
          } else if (img === imagens.kkk) {
            nivel4();
          }
        }, 1000);
      });
      containerCartas.appendChild(carta);
    });
  }

  // -------- Calma3 --------
  function calma3(babyCarta) {
    containerCartas.innerHTML = "";
    babyCarta.classList.add("topo");
    containerCartas.appendChild(babyCarta);
    mensagemJogo.textContent = "Calma, você não perdeu ainda! Confia aí nesse tal do coração das cartas e vê se acha o Mago do Tempo!\nEscolha entre 4 cartas (1 Mago do Tempo e 3 Dragon Capture):";

    const cartasDuelo = [imagens.mago, imagens.capture, imagens.capture, imagens.capture].sort(() => Math.random() - 0.5);
    const containerDuelo = document.createElement("div");
    containerDuelo.classList.add("duelo");

    cartasDuelo.forEach((img) => {
      const carta = criarCarta(imagens.verso);
      carta.addEventListener("click", () => {
        carta.src = img;
        carta.classList.add("selecionada");
        setTimeout(() => {
          carta.classList.remove("selecionada");
          if (img === imagens.mago) {
            babyCarta.classList.add("fusao");
            babyCarta.src = imagens.milenar;
            setTimeout(() => babyCarta.classList.remove("fusao"), 1000);
            parabens();
          } else {
            carta.style.animation = "desaparecer 1s forwards";
            babyCarta.style.animation = "desaparecer 1s forwards";
            setTimeout(() => derrota(), 1000);
          }
        }, 1000);
      });
      containerDuelo.appendChild(carta);
    });

    containerCartas.appendChild(containerDuelo);
  }

  // -------- Tela de derrota --------
  function derrota() {
    containerCartas.innerHTML = "";
    mensagemJogo.textContent = "Você devia ter confiado no coração das cartas!";
    const imgDerrota = document.createElement("img");
    imgDerrota.src = imagens.perdedor;
    imgDerrota.style.width = "200px";
    containerCartas.appendChild(imgDerrota);
    telaDerrota.classList.remove("escondida");
    telaJogo.classList.add("escondida");
  }

  // -------- Tela de parabéns --------
  function parabens() {
    containerCartas.innerHTML = "";
    mensagemJogo.textContent = "Parabéns, você é meu Guerreirinho!!";
    const imgParabens = document.createElement("img");
    imgParabens.src = imagens.parabens;
    imgParabens.style.width = "200px";
    containerCartas.appendChild(imgParabens);
  }
});
