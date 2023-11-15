import { FC, useCallback, useEffect, useReducer } from 'react';
import { LotteryTicket, State } from '../interfaces/interfaces';
import { Actions, UserType } from '../interfaces/enums';
import reducer from './reducer';
import { StateContext } from './StateContext';
import { ADMIN_BALANCE, ADMIN_NAME, PLAYER_BALANCE, PLAYER_NAME } from '../interfaces/constants';


const initState: State = {
    player: {
        userType: UserType.PLAYER,
        userName: window.localStorage.getItem(PLAYER_NAME) ?? '',
        balance: window.localStorage.getItem(PLAYER_BALANCE) ? parseInt(window.localStorage.getItem(PLAYER_BALANCE)!) : 10_000
    },
    admin: {
        userType: UserType.ADMIN,
        userName: window.localStorage.getItem(ADMIN_NAME) ?? '',
        balance: window.localStorage.getItem(ADMIN_BALANCE) ? parseInt(window.localStorage.getItem(ADMIN_BALANCE)!) : 0
    },
    lotteryTickets: [],
    draws: []
}

type StateContextProps = {
    children: string | JSX.Element | JSX.Element[] 
  }


const StateContextProvider: FC<StateContextProps> = ({children}) => {
  
    const [state, dispatch] = useReducer(reducer, initState);

    const {player, admin, lotteryTickets} = state;

    useEffect(() => {
      const {userName, balance} = player;
      window.localStorage.setItem(PLAYER_NAME, userName)
      window.localStorage.setItem(PLAYER_BALANCE, balance.toString())
    }, [player])

    useEffect(() => {
      const {userName, balance} = admin;
      window.localStorage.setItem(ADMIN_NAME, userName)
      window.localStorage.setItem(ADMIN_BALANCE, balance.toString())
    }, [admin])



    const purchaseTicket = useCallback((amount: number, newTicket: LotteryTicket) => {
        dispatch({
          type: Actions.PURCHASE_TICKET,
          payload: {
            amount: amount,
            newTicket: newTicket
          }
        });
    }, []);

    const winLottary = useCallback((amount: number) => {
        dispatch({
          type: Actions.PLAYER_WINS,
          payload: {
            amount: amount
          }
        });
    }, []);

    const changeName = useCallback((newName: string, forPlayer: boolean) => {
        dispatch({
          type: forPlayer ? Actions.CHANGE_PLAYER_NAME : Actions.CHANGE_ADMIN_NAME,
          payload: {
            newName: newName
          }
        });
    }, []);

    return(
        <>
            <StateContext.Provider
                value={{
                    purchaseTicket,
                    winLottary,
                    changeName,
                    player,
                    admin,
                    lotteryTickets
                }}>
                {children}
            </StateContext.Provider>
            
        </>)

}

StateContextProvider.displayName = 'StateContextProvider';

export default StateContextProvider;