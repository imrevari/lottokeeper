import { FC } from 'react';
import { useStateContext } from '../../stateContext/StateContext';

import PlayerHeader from './PlayerHeader';


const PlayersPage: FC<any> = () => {

    const {player, purchaseTicket} = useStateContext()

    const {balance} = player


    return(<>
        <PlayerHeader />
        <div>
            
        </div>




    </>)
}

PlayersPage.displayName = 'PlayersPage';

export default PlayersPage;