import { FC } from 'react';
import { useStateContext } from '../../stateContext/StateContext';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';



const AdminHeader: FC<any> = () => {

    const {admin:{balance, userName}} = useStateContext()

    return(
        <Box data-testid="admin-header-box">
            <AppBar position="static" color='inherit'>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left'}} data-testid="admin-header-typography">
                        {`${userName}, your balance is: ${balance.toLocaleString()}`}
                    </Typography>

                </Toolbar>
            </AppBar>
        </Box>
    )
}


AdminHeader.displayName = 'AdminHeader';

export default AdminHeader;