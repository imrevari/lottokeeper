import { FC, useState } from 'react';
import { useStateContext } from '../../stateContext/StateContext';


const PlayersPage: FC<any> = () => {

    const {player, purchaseTicket, changeName} = useStateContext()

    const {balance, userName} = player

    const [name, setName] =useState<string>(userName)


    const updateName = () => {
        changeName(name, true);
    }


    return(<>
    <h1>{`Player ${userName}`} </h1>
    <h2>{balance}</h2>
    <button onClick={() => purchaseTicket(500) }>Play Lottery</button>
    <input onChange={(e) => setName(e.target.value)} value={name}></input>
    <button onClick={() => updateName() }>Update Name</button>
    </>)
}

PlayersPage.displayName = 'PlayersPage';

export default PlayersPage;