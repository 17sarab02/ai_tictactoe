import useStore from "../store.js";
import { useEffect } from "react";
import GameBlock from './GameBlock'

function Game() {
  const {gameNode, players, moveNode} = useStore()
  const {terminal, winner, winningBlocks} = gameNode.staticEvaluation()
  const movingPlayer = gameNode.movingPlayer()
  console.log(terminal)
  
  useEffect(()=>{
    if(!terminal){
      console.log('Came here')
      if(players[movingPlayer] === 'cpu'){
        console.log('Time to Move')
        setTimeout(()=>{
          moveNode(gameNode.bestMove().move)
        }, 100)
      }
    }
    else{
      console.log('FINISHED')
    }
  }, [gameNode, movingPlayer, terminal, players])
  
  return (
    <div className="Game">
      {terminal?<h2>{winner===1?'Player-1 Won':winner===-1?'Player-2 Won':'Draw'}</h2>:<h2>{movingPlayer===1?'Player-1 Turn':'Player-2 Turn'}</h2>}
      <div className="ActualGame">
        <GameBlock blockValue={gameNode.stateConfiguration()[0]} winStatus={winningBlocks.includes(0)} blockPosition={0}></GameBlock>
        <GameBlock blockValue={gameNode.stateConfiguration()[1]} winStatus={winningBlocks.includes(1)} blockPosition={1}></GameBlock>
        <GameBlock blockValue={gameNode.stateConfiguration()[2]} winStatus={winningBlocks.includes(2)} blockPosition={2}></GameBlock>
        <GameBlock blockValue={gameNode.stateConfiguration()[3]} winStatus={winningBlocks.includes(3)} blockPosition={3}></GameBlock>
        <GameBlock blockValue={gameNode.stateConfiguration()[4]} winStatus={winningBlocks.includes(4)} blockPosition={4}></GameBlock>
        <GameBlock blockValue={gameNode.stateConfiguration()[5]} winStatus={winningBlocks.includes(5)} blockPosition={5}></GameBlock>
        <GameBlock blockValue={gameNode.stateConfiguration()[6]} winStatus={winningBlocks.includes(6)} blockPosition={6}></GameBlock>
        <GameBlock blockValue={gameNode.stateConfiguration()[7]} winStatus={winningBlocks.includes(7)} blockPosition={7}></GameBlock>
        <GameBlock blockValue={gameNode.stateConfiguration()[8]} winStatus={winningBlocks.includes(8)} blockPosition={8}></GameBlock>
      </div>
    </div>
  );
}

export default Game;
