import { createContext, useContext } from 'react';
import { LotteryTicket, StateContextType } from '../interfaces/interfaces';
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


 

export const StateContext = createContext<StateContextType>({
    purchaseTicket: () => {},
    winLottary: () => {},
    changeName: () => {},
    player,
    admin,
    lotteryTickets
})



StateContext.displayName = 'StateContext';

export const useStateContext = () => useContext(StateContext);