from itertools import chain
from random import shuffle

def checkWin(board):
    board = list(chain(*board))

    if board[len(board)-1] != 0 or (board[:len(board)-1] != sorted(board[:len(board)-1])):
        return False
    else:
        return True


def createBoard(n):

    while True:
        elements = [x for x in range(n**2)]
        shuffle(elements)
        
        shaped_board = []

        for i in range(n):
            row = []
            for r in range(i*n,i*n+n):
                row.append(elements[r])
            shaped_board.append(row)

        if solvablePuzzle(shaped_board):
            break

    return shaped_board

def display_board(board):
    for r in board:
        for c in r:
            print(c, end = " ")
        print()


def start_game():
    n = 3
    board = createBoard(n)

    while not checkWin(board):
        display_board(board)
        board = makeMove(board)

    display_board(board)    
    print("\n\nGAME WON")

def X_location(board):
    for r, row in enumerate(board):
        for c, col in enumerate(row):
            if col == 0:
                return [r,c]

def valid_moves(board, x_loc):
    height = len(board)
    width = len(board[0])
    x_row = x_loc[0]
    x_col = x_loc[1]

    moves = ['R','L','D','U']

    if x_row == 0:
        moves.remove("D")
    
    if x_row == height-1:
        moves.remove("U")
    
    if x_col == 0:
        moves.remove("R")
    
    if x_col == width-1:
        moves.remove("L")

    return moves

def solvablePuzzle(board) :
    invCount = 0
    for i in range(2) :
        for j in range(i + 1, 3) :
            if (board[j][i] > 0 and board[j][i] > board[i][j]) :
                invCount += 1
    return (invCount % 2 == 0)


def makeMove(board):
    x_loc = X_location(board)
    user_input = input("Direction?\n'R' for Right\n'L' for Left\n'D' for Down\n'U' for Up\n")

    if user_input in valid_moves(board, x_loc):
        if user_input == "U":
            board[x_loc[0]][x_loc[1]], board[x_loc[0] + 1][x_loc[1]] = board[x_loc[0] + 1][x_loc[1]], board[x_loc[0]][x_loc[1]]

        elif user_input == "D":
            board[x_loc[0]][x_loc[1]], board[x_loc[0] - 1][x_loc[1]] = board[x_loc[0] - 1][x_loc[1]], board[x_loc[0]][x_loc[1]]
        
        elif user_input == "R":
            board[x_loc[0]][x_loc[1]], board[x_loc[0]][x_loc[1] - 1] = board[x_loc[0]][x_loc[1] - 1], board[x_loc[0]][x_loc[1]]
        
        elif user_input == "L":
            board[x_loc[0]][x_loc[1]], board[x_loc[0]][x_loc[1] + 1] = board[x_loc[0]][x_loc[1] + 1], board[x_loc[0]][x_loc[1]]

    else:
        print("Invalid Input\n\n")
    
    return board

if __name__ == "__main__":
    start_game()
