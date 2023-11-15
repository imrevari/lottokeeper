import { FC, useState } from 'react';
import { Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { HEADER } from '../../interfaces/constants';
import AdminsPage from '../admin/AdminsPage';
import PlayersPage from '../player/PlayersPage';

const MainComponent: FC<any> = () => {

    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    
    return(
        <>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
            
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left'}}>
                    {HEADER}
                </Typography>
                <Button color="inherit" style={{maxWidth: '130px', minWidth: '130px'}} 
                    onClick={() => setIsAdmin(false)}>Player</Button>
                <Button color="inherit" style={{maxWidth: '130px', minWidth: '130px'}} 
                    onClick={() => setIsAdmin(true)}>Admin</Button>

                <Button color="inherit" style={{maxWidth: '130px', minWidth: '130px'}}>Reset round</Button>
                <Button color="inherit" style={{maxWidth: '130px', minWidth: '130px'}}>Reset game</Button>
            </Toolbar>
        </AppBar>
        </Box>
        <br></br>

        <Container >
            {isAdmin ? <AdminsPage /> : <PlayersPage />}
            
            
        </Container>
    
        </>)
}

MainComponent.displayName = 'MainComponent';

export default MainComponent;