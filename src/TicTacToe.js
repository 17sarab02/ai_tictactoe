class GameNode {
  #gameState
  #playerToMove
  #legalMoves

  constructor(gameNode = null, move = null, gameState = null, playerToMove = null) {
    if (gameNode && move) {
      this.#gameState = [...gameNode.#gameState]
      this.#playerToMove = gameNode.#playerToMove
      this.#legalMoves = [...gameNode.#legalMoves]
      this.#gameState[move[0] * 3 + move[1]] = gameNode.#playerToMove
      this.#playerToMove = -this.#playerToMove
      this.#legalMoves = this.#legalMoves.filter(element => !(element[0] === move[0] && element[1] === move[1]))
    }

    else if (gameState) {
      this.#gameState = [...gameState]
      if (playerToMove)
        this.#playerToMove = playerToMove
    }

    else {
      this.#gameState = [0, 0, 0, 0, 0, 0, 0, 0, 0]
      this.#legalMoves = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]]
      this.#playerToMove = 1
    }
  }

  stateConfiguration(){
    return this.#gameState
  }

  movingPlayer(){
    return this.#playerToMove
  }

  printState() {
    console.log('Player to move', this.#playerToMove)
    for (var i = 0; i < 3; i++) {
      let row = "";
      for (let j = 0; j < 3; j++) {
        const value = this.#gameState[i * 3 + j];
        if (value === 1) row += "X ";
        else if (value === -1) row += "O ";
        else row += "  ";
      }
      console.log(row);
    }
  }

  staticEvaluation() {
    for(let i=0; i<3; i++)
      if(this.#gameState[i*3] !== 0)
        if(this.#gameState[i*3+1] === this.#gameState[i*3] && this.#gameState[i*3+2] === this.#gameState[i*3])
          return {terminal: true, winner: this.#gameState[i*3], winningBlocks: [i*3, i*3+1, i*3+2]}
    for(let i=0; i<3; i++)
      if(this.#gameState[i] !== 0)
        if(this.#gameState[i+3] === this.#gameState[i] && this.#gameState[i+6] === this.#gameState[i])
          return {terminal: true, winner: this.#gameState[i], winningBlocks: [i, i+3, i+6]}
    if(this.#gameState[0] !== 0)
      if(this.#gameState[4] === this.#gameState[0] && this.#gameState[8] === this.#gameState[0])
        return {terminal: true, winner: this.#gameState[0], winningBlocks: [0, 4, 8]}
    if(this.#gameState[2] !== 0)
      if(this.#gameState[4] === this.#gameState[2] && this.#gameState[6] === this.#gameState[2])
        return {terminal: true, winner: this.#gameState[2], winningBlocks: [2, 4, 6]}
    for(var i=0; i<9; i++)
      if(this.#gameState[i] === 0)
        return {terminal: false, winner: 0, winningBlocks: []}
    return {terminal: true, winner: 0, winningBlocks: [0, 1, 2, 3, 4, 5, 6, 7, 8]}
  }

  moveLegal(move){
    if(this.#gameState[move[0]*3 + move[1]] === 0)
      return true
    return false
  }

  movedNode(move){
    return new GameNode(this, move, null, null)
  }

  bestMove(depth=9){
    const {terminal, winner} = this.staticEvaluation()
    if(terminal || depth === 0)
      return {score: winner, move: null}

    if(this.#playerToMove > 0){
      let utilityScore = Number.NEGATIVE_INFINITY
      let utilityMove = this.#legalMoves[0]
      for(let i=0; i<this.#legalMoves.length; i++){
        let moveToTest = this.#legalMoves[i]
        let nextNode = this.movedNode(moveToTest)
        let scoreAndMove = nextNode.bestMove(depth-1)
        if(scoreAndMove.score > utilityScore){
          utilityScore = scoreAndMove.score
          utilityMove = moveToTest
        }
      }
      return {score: utilityScore, move: utilityMove}
    }

    if(this.#playerToMove < 0){
      var utilityScore = Number.POSITIVE_INFINITY
      var utilityMove = this.#legalMoves[0]
      for(var i=0; i<this.#legalMoves.length; i++){
        var moveToTest = this.#legalMoves[i]
        var nextNode = this.movedNode(moveToTest)
        var scoreAndMove = nextNode.bestMove(depth-1)
        if(scoreAndMove.score < utilityScore){
          utilityScore = scoreAndMove.score
          utilityMove = moveToTest
        }
      }
      return {score: utilityScore, move: utilityMove}
    }
  }
}

export default GameNode