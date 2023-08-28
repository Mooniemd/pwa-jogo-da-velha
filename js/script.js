// até a linha 26 são os códigos base de checagem e definição

const blocks = Array.from(document.querySelectorAll('.block'));
const jogadorDisplay = document.querySelector('.display-jogador');
const reiniciarBtn = document.querySelector('#reiniciar');

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
    currentPlayer = jogadorAtual === 'X' ? 'O' : 'X';
    jogadorDisplay.innerText = jogadorAtual;
    jogadorDisplay.classList.add(`Jogador${jogadorAtual}`);
}

//código pra mostrar de quem é a ação e no final muda o jogador (não tá funcionando também)
const acao = (block , index) => {
    if (movimentoValido(block) && jogoAtivo) {
      block.innerText = jogadorAtual;
      block.classList.add(`Jogador${jogadorAtual}`);
      updateBoard(index);
      handleResultValidation();
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
}

reiniciar.addEventListener('click', reiniciarTabuleiro);
