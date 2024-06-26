import useStore from "../store";

function GameBlock({blockValue, blockPosition, winStatus}) {
  const {gameNode, moveNode, players, symbolMapping} = useStore()
  const {terminal} = gameNode.staticEvaluation()

  const clickAction = ()=>{
    if(!terminal){
      if(players[gameNode.movingPlayer()] === 'human')
        if(gameNode.moveLegal([Math.floor(blockPosition/3), blockPosition%3])){
          console.log(gameNode.movingPlayer())
          moveNode([Math.floor(blockPosition/3), blockPosition%3])
        }
    }
  }

  return (
    <div className="Block" onClick={clickAction} style={{
      cursor: (blockValue?'not-allowed':'pointer'),
      background: winStatus?'#add7ff':'white'
    }}>

      {(symbolMapping[blockValue]===-1)&&<svg viewBox="0 0 75 75">
          <circle stroke="#58595b" cx="37.5" cy="37.5" r="20" fill='none' strokeMiterlimit='10' strokeWidth='4' strokeDasharray={126}>
            <animate className="CircleStroke" attributeName="stroke-dashoffset" begin="0s" dur="500ms" fill="freeze" from='126' to="0" />
          </circle>
      </svg>}

      {(symbolMapping[blockValue]===1)&&<svg viewBox="0 0 75 75">
        <line x1="22.5" y1="22.5" x2="52.5" y2="52.5" fill='none' strokeMiterlimit='10' strokeDashoffset={43} strokeWidth='4' strokeDasharray={43} stroke="#58595b" strokeLinecap='round'>
          <animate className="LineStroke" attributeName="stroke-dashoffset" begin="0s" dur="300ms" fill="freeze" from='43' to="0" />
        </line>
        <line x1="52.5" y1="22.5" x2="22.5" y2="52.5" fill='none' strokeMiterlimit='10' strokeDashoffset={43} strokeWidth='4' strokeDasharray={43} stroke="#58595b" strokeLinecap='round'>
        <animate className="LineStroke" attributeName="stroke-dashoffset" begin="200ms" dur="300ms" fill="freeze" from='43' to="0" />
        </line>
      </svg>}
    </div>
  );
}

export default GameBlock;
