import { FC, useState } from 'react';
import { useStateContext } from '../../stateContext/StateContext';

import { Input } from '@mui/base/Input';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';



const AdminHeader: FC<any> = () => {

    const {admin:{balance, userName}} = useStateContext()

    return(<>
        <Box sx={{ flexGrow: 3 }}>
            <AppBar position="static" color='inherit'>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left'}}>
                        {`${userName}, your balance is: ${balance}`}
                    </Typography>

                </Toolbar>
            </AppBar>
        </Box>
    </>)
}


AdminHeader.displayName = 'AdminHeader';

export default AdminHeader;