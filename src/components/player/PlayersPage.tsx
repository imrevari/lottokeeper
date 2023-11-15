import { FC, useMemo, useState } from 'react';
import { useStateContext } from '../../stateContext/StateContext';

import PlayerHeader from './PlayerHeader';
import { Box, Button, ButtonGroup, Container } from '@mui/material';
import PopupWindow from './PopupWindow';
import PurchasedTicketsTable from './PurchasedTicketsTable';
import { UserType } from '../../interfaces/enums';


const PlayersPage: FC<any> = () => {

    const {lotteryTickets} = useStateContext()

    const [open, setOpen] = useState<boolean>(false);

    const ticketsOfThePlayer = useMemo(() => {
        return lotteryTickets.filter(({user}) => user.userType == UserType.PLAYER)
    }, [lotteryTickets])


    return(<>
        <PlayerHeader />

        <Box sx={{ flexGrow: 3 }}>
            <ButtonGroup sx={{margin: '9px 0px 2px 0px'}}>
                <Button color="inherit" variant='outlined'
                            style={{maxWidth: '140px', minWidth: '140px'}}
                            onClick={() => setOpen(true)}
                    >Buy ticket</Button>
            </ButtonGroup>
            <PurchasedTicketsTable rows={ticketsOfThePlayer}/>
            <PopupWindow open={open} setOpen={setOpen}/>
        </Box>
    </>)
}

PlayersPage.displayName = 'PlayersPage';

export default PlayersPage;