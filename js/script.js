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
