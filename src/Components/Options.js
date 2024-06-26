import useStore from "../store";

function Options() {
  const {swapSymbols, symbolMapping, setPlayers, resetGame} = useStore()

  const triggerChange = (e)=>{
    const objectToInject = JSON.parse(e.target.value)
    setPlayers(objectToInject)
  }
  return (
    <div className="Options">
      <h3 className="Player1Heading">P1</h3>
      <h3 className="Player2Heading">P2</h3>

      <div className="SVGContainer">      
      <svg viewBox="0 0 75 75" className="Player1" style={{transform: `translateX(${symbolMapping[1]===1?12:88}px)`}}>
          <circle stroke="#58595b" cx="37.5" cy="37.5" r="20" fill='none' strokeMiterlimit='10' strokeWidth='4' strokeDasharray={126}>
            <animate className="CircleStroke" attributeName="stroke-dashoffset" begin="0s" dur="500ms" fill="freeze" from='126' to="0" />
          </circle>
      </svg>

      <svg viewBox="0 0 75 75" className="Player2" style={{transform: `translateX(${symbolMapping[-1]===-1?88:12}px)`}}>
        <line x1="22.5" y1="22.5" x2="52.5" y2="52.5" fill='none' strokeMiterlimit='10' strokeDashoffset={43} strokeWidth='4' strokeDasharray={43} stroke="#58595b" strokeLinecap='round'>
          <animate className="LineStroke" attributeName="stroke-dashoffset" begin="0s" dur="300ms" fill="freeze" from='43' to="0" />
        </line>
        <line x1="52.5" y1="22.5" x2="22.5" y2="52.5" fill='none' strokeMiterlimit='10' strokeDashoffset={43} strokeWidth='4' strokeDasharray={43} stroke="#58595b" strokeLinecap='round'>
        <animate className="LineStroke" attributeName="stroke-dashoffset" begin="200ms" dur="300ms" fill="freeze" from='43' to="0" />
        </line>
      </svg>
      </div>
      <button onClick={swapSymbols} className="SwapButton">Swap</button>
      <button onClick={resetGame} className="ResetButton">Reset</button>
      <select className="PlayerOptions" onChange={triggerChange}>
        <option value={JSON.stringify({'1': 'human', '-1': 'cpu'})}>Human - CPU</option>
        <option value={JSON.stringify({'1': 'cpu', '-1': 'human'})}>CPU - Human</option>
        <option value={JSON.stringify({'1': 'human', '-1': 'human'})}>Human - Human</option>
      </select>
    </div>
  );
}

export default Options;
