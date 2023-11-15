import { createContext, useContext } from 'react';
import { Draw, LotteryTicket, StateContextType } from '../interfaces/interfaces';
import { UserType } from '../interfaces/enums';

const player = {
    userType: UserType.PLAYER,
    userName: '',
    balance: 0
}

const admin = {
    userType: UserType.ADMIN,
    userName: '',
    balance: 0
}

const lotteryTickets = new Array<LotteryTicket>()

const draws = new Array<Draw>()
 

export const StateContext = createContext<StateContextType>({
    purchaseTicket: () => {},
    winLottary: () => {},
    changeName: () => {},
    draw: () => {},
    player,
    admin,
    lotteryTickets,
    draws
})



StateContext.displayName = 'StateContext';

export const useStateContext = () => useContext(StateContext);