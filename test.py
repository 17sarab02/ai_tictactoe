class GameNode:
    def __init__(self, gameNode=None, move=None, gameState=None, playerToMove=None):
        if(gameNode):
            self.__gameState = gameNode.__gameState.copy()
            self.__playerToMove = gameNode.__playerToMove
            self.__legalMoves = gameNode.__legalMoves.copy()
            if(move):
                self.__gameState[move[0]*3+move[1]] = gameNode.__playerToMove
                self.__playerToMove = -self.__playerToMove
                self.__legalMoves.remove(move)

        elif(gameState):
            self.__gameState = gameState.copy()
            if(playerToMove):
                self.__playerToMove = playerToMove
                
        else:
            self.__gameState = [0 for i in range(9)]
            self.__legalMoves = [(i, j) for i in range(3) for j in range(3)]
            self.__playerToMove = 1

        self.__setComparators()

    def __setComparators(self):
        if(self.__playerToMove == 1):
            self.__minmaxScore = float('-inf')
        else:
            self.__minmaxFunction = min

    def __str__(self):
        integerValueMapping = {1: 'X', -1: 'O', 0: '-'}
        return '\n'.join([' '.join([integerValueMapping[self.__gameState[i*3+j]] for j in range(3)]) for i in range(3)])
    
    def staticEvaluation(self):
        # GAME FINISHED FOR HORIZONTAL LINE
        for i in range(3):
            if all(self.__gameState[i*3 + j] == self.__gameState[i*3] for j in range(3)) and self.__gameState[i*3] != 0:
                return True, self.__gameState[i*3]
        # GAME FINISHED FOR VERTICAL LINE
        for i in range(3):
            if all(self.__gameState[i + j * 3] == self.__gameState[i] for j in range(3)) and self.__gameState[i] != 0:
                return True, self.__gameState[i]
        # GAME FINISHED FOR REVERSE-SLASH DIAGONAL
        if all(self.__gameState[i * 4] == self.__gameState[0] for i in range(3)) and self.__gameState[0] != 0:
            return True, self.__gameState[0]
        # GAME FINISHED FOR SWORD-SLASH DIAGONAL
        if all(self.__gameState[2 + i * 2] == self.__gameState[2] for i in range(3)) and self.__gameState[2] != 0:
            return True, self.__gameState[2]
        # GAME OVER BUT NO ONE WON
        if all(cell != 0 for cell in self.__gameState):
            return True, 0
        # GAME NOT OVER YET
        return False, 0

    def movedNode(self, move):
        return GameNode(gameNode=self, move=move)

    def bestMove(self, depth=9):
        terminal, winner = self.staticEvaluation()
        if(terminal or (depth==0)):
            return winner, (0, 0)

        scoreMoveMapping = dict()

        for move in next_possible_moves:
            furtherNode = self.movedNode(gameNode=self, move=move)
            score, furtherMove = gameTreeNode.best_move(depth-1)
            scoreMoveMapping.update({score: move})
        utilityScore = self.__minmaxFunction(scoreMoveMapping)
        utilityMove = scoreMoveMapping[utilityScore]

        return utilityScore, utilityMove

firstTurn = input('Do you want to play the first turn? (Y/N): ').upper()
characterToPlay = input('Which character do you wanna pick, (default is X)? (O/X): ').upper()
if(characterToPlay == 'O'):
    integerToPlay = -1
else:
    integerToPlay = 1
gameBase = GameState(playerToMove=integerToPlay)
if(not(firstTurn[0] == 'Y')):
    gameBase.switchPlayer()
    winner, bestMove = gameBase.best_move()
    gameBase.makeMove(bestMove[0], bestMove[1])
    gameBase.switchPlayer()

while True:
    print('Game State')
    gameBase.printState()
    terminal, winner = gameBase.terminal_winner()
    if(terminal):
        if(winner == integerToPlay):
            print('Congratulations! You won!')
        elif(winner == -integerToPlay):
            print('Sorry dude.. you lost :(')
        else:
            print("I guess it's a draw?")
        break
    user_move = tuple([int(option) for option in input('Enter move, (row, column), comma-seperated: ').split(',')])
    gameBase.makeMove(user_move[0], user_move[1])
    gameBase.switchPlayer()

    print("AI is making it's own move")
    final_winner, ai_move = gameBase.best_move()
    gameBase.makeMove(ai_move[0], ai_move[1])
    gameBase.switchPlayer()
    if(terminal):
        if(winner == integerToPlay):
            print('Congratulations! You won!')
        elif(winner == -integerToPlay):
            print('Sorry dude.. you lost :(')
        else:
            print("I guess it's a draw?")
        break
