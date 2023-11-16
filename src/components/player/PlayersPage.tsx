import { FC, useMemo, useState } from 'react';
import { useStateContext } from '../../stateContext/StateContext';

import { Alert, Box, Button, ButtonGroup, Snackbar } from '@mui/material';
import { UserType } from '../../interfaces/enums';
import PlayerHeader from './PlayerHeader';
import PopupWindow from './PopupWindow';
import PurchasedTicketsTable from './PurchasedTicketsTable';
import AllTicketsTable from './AllTicketsTable';


const PlayersPage: FC<any> = () => {

    const {player: {balance}, lotteryTickets, draws} = useStateContext()

    const [open, setOpen] = useState<boolean>(false);
    const [snackBarOpened, setSnackBarOpened] = useState<boolean>(false)

    const buyTicket = () => {
        if(balance <= 0){
            setSnackBarOpened(true)
        }else{
            setOpen(true)
        }
    }

    const ticketsOfThePlayer = useMemo(() => {
        return lotteryTickets.filter(({user}) => user.userType == UserType.PLAYER)
    }, [lotteryTickets])


    return(<>
        <PlayerHeader />

        <Box sx={{ flexGrow: 3 }}>
            <ButtonGroup sx={{margin: '9px 0px 2px 0px'}}>
                <Button color="inherit" variant='outlined'
                            style={{maxWidth: '140px', minWidth: '140px'}}
                            onClick={buyTicket}
                    >Buy ticket</Button>
            </ButtonGroup>

            {draws.length === 0
            ?
            <PurchasedTicketsTable rows={ticketsOfThePlayer}/>
            :
            <AllTicketsTable rows={ticketsOfThePlayer}/>
            }

            
            
            <PopupWindow open={open} setOpen={setOpen}/>

            <Snackbar
                open={snackBarOpened}
                autoHideDuration={6000}
                onClose={() => setSnackBarOpened(false)}
                >
                    <Alert severity="error">Your have no balance to play</Alert>
            </Snackbar>
        </Box>
    </>)
}

PlayersPage.displayName = 'PlayersPage';

export default PlayersPage;