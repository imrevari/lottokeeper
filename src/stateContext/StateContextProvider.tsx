import { FC, useCallback, useReducer } from 'react';
import { State } from '../interfaces/interfaces';
import { Actions, UserType } from '../interfaces/enums';
import reducer from './reducer';
import { StateContext } from './StateContext';


const initState: State = {
    player: {
        userType: UserType.PLAYER,
        userName: "",
        balance: 10_000
    },
    admin: {
        userType: UserType.ADMIN,
        userName: "",
        balance: 0
    }

    
}

type StateContextProps = {
    children: string | JSX.Element | JSX.Element[] 
  }


const StateContextProvider: FC<StateContextProps> = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initState);

    const purchaseTicket = useCallback((amount: number) => {
        dispatch({
          type: Actions.PURCHASE_TICKET,
          payload: {
            amount: amount
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

    const chaneName = useCallback((newName: string, forPlayer: boolean) => {
        dispatch({
          type: forPlayer ? Actions.CHANGE_PLAYER_NAME : Actions.CHANGE_ADMIN_NAME,
          payload: {
            newName: newName
          }
        });
    }, []);

    const {player, admin} = state;


    return(
        <>
            <StateContext.Provider
                value={{
                    purchaseTicket,
                    winLottary,
                    chaneName,
                    player,
                    admin
                }}>
                {children}
            </StateContext.Provider>
            
        </>)

}

StateContextProvider.displayName = 'StateContextProvider';

export default StateContextProvider;