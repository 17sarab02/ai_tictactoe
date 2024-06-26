import {create} from 'zustand'
import GameNode from './TicTacToe'

const useStore = create(set => ({
    gameNode: new GameNode(),
    resetGame: ()=>{
        set({
            gameNode: new GameNode()
        })
    },
    moveNode: (move)=>{
        set(state=>{
            return {
                gameNode: state.gameNode.movedNode(move)
            }
        })
    },
    players: {
        '1': 'human',
        '-1': 'cpu'
    },
    symbolMapping: {
        '1': -1,
        '-1': 1
    },
    swapSymbols: ()=>{
        set(state=>{
            return {
                symbolMapping: {
                    '1': -state.symbolMapping[1],
                    '-1': -state.symbolMapping[-1]
                }
            }
        })
    },
    setPlayers: (ourValues)=>{
        set({players: ourValues})
    }
}))

export default useStore;