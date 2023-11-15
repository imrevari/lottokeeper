import { FC, useState } from 'react';
import { useStateContext } from '../../stateContext/StateContext';

import PlayerHeader from './PlayerHeader';
import { Box, Button, Container } from '@mui/material';
import PopupWindow from './PopupWindow';


const PlayersPage: FC<any> = () => {

    const {player} = useStateContext()

    const [open, setOpen] = useState<boolean>(false);


    return(<>
        <PlayerHeader />

        <Box sx={{ flexGrow: 3 }}>

            <Button color="inherit" variant='outlined'
                    style={{maxWidth: '140px', minWidth: '140px'}}
                    onClick={() => setOpen(true)}
            >Buy ticket</Button>
            
            <PopupWindow open={open} setOpen={setOpen}/>
        </Box>


        



    </>)
}

PlayersPage.displayName = 'PlayersPage';

export default PlayersPage;