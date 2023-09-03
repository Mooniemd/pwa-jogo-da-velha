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

// simplesmente anuncia quem vence ou se deu empate
const anuncio = (type) => {
    switch(type){
       case "O":
            anunciar.innerHTML = 'jogador <span class="jogadorO">O</span> venceu!';
            break;
       case "X":
            anunciar.innerHTML = 'jogador <span class="jogadorX">X</span> venceu!';
            break;
       case empate:
            anunciar.innerHTML = 'Que pena, deu empate!';
        }
};

var jogadas = 0;

// checagem de quem venceu e como funciona a seleção dos bloquinhos
function resultado(){
    let vitoria = false;

    valores = []
    for(let i = 0; i < blocks.length; i++){
        valores [i] = blocks[i].innerHTML
    }

    if(valores[0] != '' && valores[1] != '' && valores[2] != ''){
        if(valores[0] == valores[1] && valores[1] == valores[2]){
            return anuncio(valores[0])
        }
    }

    if(valores[3] != '' && valores[4] != '' && valores[5] != ''){
        if(valores[3] == valores[4] && valores[4] == valores[5]){
            return anuncio(valores[3])
        }
    }

    if(valores[6] != '' && valores[7] != '' && valores[8] != ''){
        if(valores[6] == valores[7] && valores[7] == valores[8]){
            return anuncio(valores[6])
        }
    }

    if(valores[0] != '' && valores[3] != '' && valores[6] != ''){
        if(valores[0] == valores[3] && valores[3] == valores[6]){
            return anuncio(valores[0])
        }
    }

    if(valores[1] != '' && valores[4] != '' && valores[7] != ''){
        if(valores[1] == valores[4] && valores[4] == valores[7]){
            return anuncio(valores[1])
        }
    }

    if(valores[2] != '' && valores[5] != '' && valores[8] != ''){
        if(valores[2] == valores[5] && valores[5] == valores[8]){
            return anuncio(valores[2])
        }
    }

    if(valores[0] != '' && valores[4] != '' && valores[8] != ''){
        if(valores[0] == valores[4] && valores[4] == valores[8]){
            return anuncio(valores[0])
        }
    }

    if(valores[2] != '' && valores[4] != '' && valores[6] != ''){
        if(valores[2] == valores[4] && valores[4] == valores[6]){
            return anuncio(valores[2])
        }
    }

    if (vitoria){
        anuncio(jogadorAtual == "X" ? jogadorOvence : jogadorXvence);
        jogoAtivo = false;
        return;
    }
    if (jogadas == 9) anuncio(empate);

}

//código pra mostrar de quem é a ação e no final muda o jogador
const acao = (block , index) => {
    if (movimentoValido(block) && jogoAtivo) {
      jogadas++
      block.innerText = jogadorAtual;
      block.classList.add(`Jogador${jogadorAtual}`);
      resultado();
      atualizarTabuleiro(index);
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

    jogadas = 0
}

reiniciarBtn.addEventListener('click', reiniciarTabuleiro);
