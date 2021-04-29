var board = []
var valid_moves = []
var inputted_key = ""

function setup() {
  createCanvas(399, 450);
  board = createBoard()
}

function draw() {
  background(255);
  makeMove();

  for (var r = 0; r < 3; r++) {
    for (var c = 0; c < 3; c++) {

      if (board[r][c] == 0) {
        stroke(255)
        fill(255)
        rect(133 * c, 133 * r, 133, 133)
      } else {
        stroke(255)
        if (checkWin(board)) {
          fill(97, 212, 128)
        } else {
          fill(255, 127, 117)
        }
        rect(133 * c, 133 * r, 133, 133)

        fill(255)
        noStroke();
        textSize(55);
        textAlign(CENTER, CENTER);
        text(board[r][c], 133 * c + 65.5, 133 * (r + 0.5) + 7)
      }

    }
  }
}

function checkWin(board) {
  board = board.flat()

  if (board[8] != 0 || JSON.stringify(board.slice(0,8)) !== JSON.stringify(board.slice(0,8).sort())) {
    return false;
  }
  return true;
}

function createBoard() {
  
  while(true){
    elements = [1, 2, 3, 4, 5, 6, 7, 8, 0].sort(() => 0.5 - Math.random());
    board = [elements.slice(0, 3), elements.slice(3, 6), elements.slice(6, 9)]
    
    if (solvableBoard(board)){
      break;
    }
  }
  
  return board;
}

function X_location() {
  for (var r = 0; r < 3; r++) {
    for (var c = 0; c < 3; c++) {
      if (board[r][c] == 0) {
        return [r, c];
      }
    }
  }
}

function valid_move(x_loc, move) {
  var h = 3
  var w = 3;
  var x_row = x_loc[0];
  var x_col = x_loc[1];

  if (x_row != 0 && move == "D") {
    [board[x_loc[0]][x_loc[1]], board[x_loc[0] - 1][x_loc[1]]] = [board[x_loc[0] - 1][x_loc[1]], board[x_loc[0]][x_loc[1]]]
    return true;
  }

  if (x_row != (h - 1) && move == "U") {
    [board[x_loc[0]][x_loc[1]], board[x_loc[0] + 1][x_loc[1]]] = [board[x_loc[0] + 1][x_loc[1]], board[x_loc[0]][x_loc[1]]]
    return true;
  }

  if (x_col != 0 && move == "R") {
    [board[x_loc[0]][x_loc[1]], board[x_loc[0]][x_loc[1] - 1]] = [board[x_loc[0]][x_loc[1] - 1], board[x_loc[0]][x_loc[1]]]
    return true;
  }

  if (x_col != (w - 1) && move == "L") {
    [board[x_loc[0]][x_loc[1]], board[x_loc[0]][x_loc[1] + 1]] = [board[x_loc[0]][x_loc[1] + 1], board[x_loc[0]][x_loc[1]]]
    return true;
  }

  return false;
}

function makeMove() {
  x_loc = X_location(board)

  if (valid_move(x_loc, inputted_key)) {
    inputted_key = "";
  } else if (inputted_key != "") {
    fill(255, 0, 0)
    noStroke();
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Invalid Input", 200, 425)
  }
}

function keyPressed() {
  if (keyCode == UP_ARROW || key == "w") {
    inputted_key = "U";
  } else if (keyCode == DOWN_ARROW || key == "s") {
    inputted_key = "D";
  } else if (keyCode == LEFT_ARROW || key == "a") {
    inputted_key = "L";
  } else if (keyCode == RIGHT_ARROW || key == "d") {
    inputted_key = "R";
  } else if (key == "n")
    {
      board = createBoard() 
    }
}

function solvableBoard(board)
{
    var inversionCount = 0 ;
    for(var r = 0; r < 2;r++){
        for(var c = r + 1; c < 3; c++){
            
            if (board[c][r] > 0 && board[c][r] > board[c][r])
                inversionCount += 1;
        }
     }
    return inversionCount%2 == 0;
}
