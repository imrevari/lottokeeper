import { Box, Button } from '@mui/material';
import { FC } from 'react';
import AdminHeader from './AdminHeader';
import AllTicketsTable from './AllTicketsTable';
import { useStateContext } from '../../stateContext/StateContext';


const AdminsPage: FC<any> = () => {

    const {lotteryTickets} = useStateContext()

    return(<>
    <AdminHeader />

    <Box sx={{ flexGrow: 3 }}>
        <div>
                <Button color="inherit" variant='outlined'
                sx={{marginRight: '9px', marginTop: '15px', maxWidth: '250px', minWidth: '250px'}}
                    >Generate random games</Button>

                <Button color="inherit" variant='outlined'
                sx={{marginRight: '9px', marginTop: '15px', maxWidth: '250px', minWidth: '250px'}}
                    >Draw lottery</Button>
        </div>
        <AllTicketsTable rows={lotteryTickets}/>

            {/* <PopupWindow open={open} setOpen={setOpen}/> */}
        </Box>


    
    </>)
}

AdminsPage.displayName = 'AdminsPage';

export default AdminsPage;