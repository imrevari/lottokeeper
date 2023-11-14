import { createContext, useContext } from 'react';
import { StateContextType } from '../interfaces/interfaces';
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

export const StateContext = createContext<StateContextType>({
    purchaseTicket: () => {},
    winLottary: () => {},
    changeName: () => {},
    player,
    admin
})



StateContext.displayName = 'StateContext';

export const useStateContext = () => useContext(StateContext);