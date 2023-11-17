import { Box, Button } from '@mui/material';
import { FC, useState } from 'react';
import { useStateContext } from '../../stateContext/StateContext';
import AdminHeader from './AdminHeader';
import AllTicketsAdminTable from './AllTicketsAdminTable';
import DrowPopupWindow from './DrowPopupWindow';
import RandomGeneratorPopupWindow from './RandomGeneratorPopupWindow';


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
    <AdminHeader />

    <Box sx={{ flexGrow: 3 }}>
        <div>
                <Button color="inherit" variant='outlined'
                sx={{marginRight: '9px', marginTop: '15px', maxWidth: '250px', minWidth: '250px'}}
                onClick={generateRandomGames}
                    >Generate random games</Button>

                <Button color="inherit" variant='outlined'
                onClick={startDraw}
                sx={{marginRight: '9px', marginTop: '15px', maxWidth: '250px', minWidth: '250px'}}
                    >Draw lottery</Button>
        </div>
        {draws.length === 0
        ?
        <AllTicketsAdminTable rows={lotteryTickets.sort( ({user: {userType: a}}, {user: {userType: b}}) => a - b)}/>
        :
        <></>}
        <DrowPopupWindow open={isDrawOpened} setOpen={setIsDrawOpened}/>
        <RandomGeneratorPopupWindow open={isRandomGeneratorOpened} setOpen={setIsRandomgeneratorOpened}/>
    </Box>
    </>)
}

AdminsPage.displayName = 'AdminsPage';

export default AdminsPage;
