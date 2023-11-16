import { Actions, UserType } from '../interfaces/enums';
import { Action, State } from '../interfaces/interfaces';


const newState: State = {
    player: {
        userType: UserType.PLAYER,
        userName: '',
        balance: 10_000
    },
    admin: {
        userType: UserType.ADMIN,
        userName: 'Admin',
        balance: 0
    },
    lotteryTickets: [],
    draws: []
  }

const reducer = (state: State, action: Action): State => {

    switch (action.type) {
        case Actions.PURCHASE_TICKET:
            return {
                ...state,
                player: {...state.player, 
                    balance: action.payload.newTicket.user.userType === UserType.FAKE_PLAYER
                    ?
                    state.player.balance
                    :
                    state.player.balance  - action.payload.amount},
                admin: {...state.admin, balance: state.admin.balance + action.payload.amount},
                lotteryTickets: [...state.lotteryTickets, action.payload.newTicket]
            }
        case Actions.PLAYER_WINS:
            return {
                ...state,
                player: {...state.player, balance: state.player.balance + action.payload.amount},
            }
        case Actions.CHANGE_PLAYER_NAME:
            return {
                ...state,
                player: {...state.player, userName: action.payload.newName}
            }
        case Actions.CHANGE_ADMIN_NAME:
            return {
                ...state,
                admin: {...state.admin, userName: action.payload.newName}
            }
        case Actions.DRAW:
            return {
                ...state, 
                draws: [...state.draws, action.payload.newDraw]
            }
        case Actions.RESET_ROUND:
            return {
                ...state,
                lotteryTickets: [],
                draws: []
            }
        case Actions.RESET_GAME:
            return {
                ...newState
            }
        case Actions.ADMIN_LOSES:
            return {
                ...state,
            admin: {...state.admin, balance: state.admin.balance - action.payload.amount}
            }
        case Actions.UPDATE_DRAWN_TICKETS:
            // state.lotteryTickets.filter( ({drawConducted}) => !drawConducted)
            // console.log([...state.lotteryTickets.filter( ({drawConducted}) => drawConducted)])
            return {
                ...state,
                lotteryTickets: [...state.lotteryTickets.filter( ({drawConducted}) => !drawConducted),
                     ...action.payload.updatedTickets]
            }
        default:
            return state;

    }
}

export default reducer;