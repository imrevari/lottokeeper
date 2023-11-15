import { FC } from 'react';
import { useStateContext } from '../../stateContext/StateContext';

import PlayerHeader from './PlayerHeader';
import { Box, Button, Container } from '@mui/material';


const PlayersPage: FC<any> = () => {

    const {player, purchaseTicket} = useStateContext()

    const {balance} = player


    return(<>
        <PlayerHeader />

        <Box sx={{ flexGrow: 3 }}>

            <Button color="inherit" variant='outlined'
                    style={{maxWidth: '140px', minWidth: '140px'}}
            >Buy ticket</Button>
            
            
        </Box>


        



    </>)
}

PlayersPage.displayName = 'PlayersPage';

export default PlayersPage;