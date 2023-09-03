window.onload = () => {
    'use strict';
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js');
    }
}

// até a linha 26 são os códigos base de checagem e definição

const blocks = Array.from(document.querySelectorAll('.block'));
const jogadorDisplay = document.querySelector('.display-jogador');
const reiniciarBtn = document.querySelector('#reiniciar');
const anunciar = document.querySelector('.anunciar')

var tabuleiro = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
 ];
let jogadorAtual = 'X';
let jogoAtivo = true;

const jogadorXvence = 'jogadorXvence';
const jogadorOvence = 'jogadorOvence';
const empate = 'empate';
const condicaoDeVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
 ];

// define quem tá fazendo o movimento
 const movimentoValido = (block) => {
    return block.innerText !== 'X' && block.innerText !== 'O';
};

// dá a possibilidade do jogador atual mexer no tabuleiro
const atualizarTabuleiro =  (index) => {
    tabuleiro[index] = jogadorAtual;
 }

//código que muda o jogador conforme o click (não tá funcionando ainda)
 const mudarJogador = () => {
    jogadorDisplay.classList.remove(`Jogador${jogadorAtual}`);
    jogadorAtual == 'X' ? jogadorAtual = 'O' : jogadorAtual = 'X';
    jogadorDisplay.innerText = jogadorAtual;
    jogadorDisplay.classList.add(`Jogador${jogadorAtual}`);
}

const anuncio = (type) => {
    switch(type){
       case jogadorOvence:
            anunciar.innerHTML = 'jogador <span class="jogadorO">O</span> venceu!';
            break;
       case jogadorXvence:
            anunciar.innerHTML = 'jogador <span class="jogadorX">X</span> venceu!';
            break;
       case empate:
            anunciar.innerText = 'Que pena, deu empate!';
        }
    anunciar.classList.remove('hide');
};

function resultado(){
    const vitoria = false;
    for (let i = 0; i <=7; i++){
        const condicao = condicaoDeVitoria[i];
        const block1 = tabuleiro[condicao[0]];
        const block2 = tabuleiro[condicao[1]];
        const block3 = tabuleiro[condicao[2]];
        if (block1 == "" || block2 == "" || block3 == ""){
        }
        if (block1 == block2 && block2 == block3){
            vitoria = true
        }
    }
    if (vitoria){
        anuncio(jogadorAtual == "X" ? jogadorAtual = jogadorXvence : jogadorAtual = jogadorOvence);
        jogoAtivo = false
        return;
    }

    if (!tabuleiro.includes("")) anuncio(empate);
}

//código pra mostrar de quem é a ação e no final muda o jogador (não tá funcionando também)
const acao = (block , index) => {
    if (movimentoValido(block) && jogoAtivo) {
      block.innerText = jogadorAtual;
      block.classList.add(`Jogador${jogadorAtual}`);
      atualizarTabuleiro(index);
      resultado();
      mudarJogador();
    }
  };

    blocks.forEach( (block, index) => {
    block.addEventListener('click', () => acao(block, index));
    });

// reinicia o tabuleiro checando quem tá jogando e setando o texto pra vazio.
const reiniciarTabuleiro = () => {
    tabuleiro = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
     ];
    jogoAtivo = true;

    if (jogadorAtual === 'O') {
        mudarJogador();
    }

    blocks.forEach(block => {
        block.innerText = '';
        block.classList.remove('playerX');
        block.classList.remove('playerO');
    });

    anunciar.classList.add('hide');
}

reiniciarBtn.addEventListener('click', reiniciarTabuleiro);
