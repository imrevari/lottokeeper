import { Box, Button } from '@mui/material';
import { FC, useState } from 'react';
import { useStateContext } from '../../stateContext/StateContext';
import AdminHeader from './AdminHeader';
import AllTicketsAdminTable from './AllTicketsAdminTable';
import DrawPopupWindow from './DrawPopupWindow';
import RandomGeneratorPopupWindow from './RandomGeneratorPopupWindow';
import AllTicketsSortableTable from './AllTicketsSortableTable';


const AdminsPage: FC<any> = () => {

    const {lotteryTickets, draws} = useStateContext()

    const [isRandomGeneratorOpened, setIsRandomgeneratorOpened] = useState<boolean>(false)
    const [isDrawOpened, setIsDrawOpened] = useState<boolean>(false)


    const generateRandomGames = () => {
        setIsDrawOpened(false)
        setIsRandomgeneratorOpened(true)
    }

    const startDraw = () =>{
        setIsRandomgeneratorOpened(false)
        setIsDrawOpened(true)
    }

    return(<>
    <AdminHeader data-testid="admin-page-header"/>

    <Box data-testid="admin-page-box">
        <div data-testid="admin-button-div">
                <Button color="inherit" variant='outlined'
                sx={{marginRight: '9px', marginTop: '15px', maxWidth: '250px', minWidth: '250px'}}
                data-testid="admin-random-button"
                onClick={generateRandomGames}
                    >Generate random games</Button>

                <Button color="inherit" variant='outlined'
                onClick={startDraw}
                data-testid="admin-draw-button"
                sx={{marginRight: '9px', marginTop: '15px', maxWidth: '250px', minWidth: '250px'}}
                    >Draw lottery</Button>
        </div>
        {draws.length === 0
        ?
        <AllTicketsAdminTable rows={lotteryTickets.sort( ({user: {userType: a}}, {user: {userType: b}}) => a - b)}
            data-testid="admin-all-tickets-table"/>
        :
        <AllTicketsSortableTable rows={lotteryTickets.sort( ({user: {userType: a}}, {user: {userType: b}}) => a - b)}
            data-testid="admin-all-tickets-sortable-table"/>}
        <DrawPopupWindow open={isDrawOpened} 
            setOpen={setIsDrawOpened}
            data-testid="admin-draw-popup"/>
        <RandomGeneratorPopupWindow open={isRandomGeneratorOpened} 
            setOpen={setIsRandomgeneratorOpened}
            data-testid="admin-random-generator-popup"/>
    </Box>
    </>)
}

AdminsPage.displayName = 'AdminsPage';

export default AdminsPage;
