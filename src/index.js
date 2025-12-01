import './styles.css';
import gnomeImage from './gnome.png';

class SimpleGame {
  constructor() {
    this.boardSize = 4;
    this.cells = [];
    this.currentPosition = null;
    this.movesCount = 0;
    this.moveInterval = null;
    
    this.initElements();
    this.initGameBoard();
    this.placeGnomeRandomly();
    this.startMoving();
  }
  
  initElements() {
    this.gameBoard = document.getElementById('gameBoard');
    this.positionElement = document.getElementById('position');
    this.movesElement = document.getElementById('moves');
    
    this.gnomeElement = document.createElement('img');
    this.gnomeElement.src = gnomeImage;
    this.gnomeElement.alt = 'Гном';
    this.gnomeElement.className = 'gnome';
  }
  
  initGameBoard() {
    this.gameBoard.innerHTML = '';
    this.cells = [];
    
    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.row = row;
        cell.dataset.col = col;
        
        const label = document.createElement('span');
        label.className = 'cell-label';
        label.textContent = `${String.fromCharCode(65 + row)}${col + 1}`;
        cell.appendChild(label);
        
        this.gameBoard.appendChild(cell);
        this.cells.push(cell);
      }
    }
  }
  
  getRandomPosition(excludePosition = null) {
    let newPosition;
    
    do {
      newPosition = Math.floor(Math.random() * this.cells.length);
    } while (excludePosition !== null && newPosition === excludePosition);
    
    return newPosition;
  }
  
  placeGnomeRandomly() {
    if (this.currentPosition !== null) {
      const oldCell = this.cells[this.currentPosition];
      oldCell.classList.remove('active');
      const gnome = oldCell.querySelector('.gnome');
      if (gnome) {
      }
    }
    
    const newPosition = this.getRandomPosition(this.currentPosition);
    this.currentPosition = newPosition;
    
    const newCell = this.cells[this.currentPosition];
    newCell.appendChild(this.gnomeElement);
    newCell.classList.add('active');
    
    this.movesCount++;
    
    this.updateUI();
  }
  
  updateUI() {
    if (this.currentPosition !== null) {
      const row = Math.floor(this.currentPosition / this.boardSize);
      const col = this.currentPosition % this.boardSize;
      const positionLabel = `${String.fromCharCode(65 + row)}${col + 1}`;
      
      this.positionElement.textContent = positionLabel;
      this.movesElement.textContent = this.movesCount - 1;
    }
  }
  
  startMoving() {
    this.moveInterval = setInterval(() => {
      this.placeGnomeRandomly();
    }, 2000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SimpleGame();
});