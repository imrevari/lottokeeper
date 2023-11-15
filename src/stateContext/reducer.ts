import { Actions, UserType } from '../interfaces/enums';
import {State, Action} from '../interfaces/interfaces'

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
                admin: {...state.admin, balance: state.admin.balance - action.payload.amount}
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
        default:
            return state;

    }
}

export default reducer;