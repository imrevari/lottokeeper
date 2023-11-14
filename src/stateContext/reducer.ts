import { Actions } from '../interfaces/enums';
import {State, Action} from '../interfaces/interfaces'

const reducer = (state: State, action: Action): State => {

    switch (action.type) {
        case Actions.PURCHASE_TICKET:
            return {
                ...state,
                player: {...state.player, balance: state.player.balance - action.payload.amount},
                admin: {...state.admin, balance: state.admin.balance + action.payload.amount}
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
        default:
            return state;

    }
}

export default reducer;