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
import { useStateContext } from '../../stateContext/StateContext';
import Questions from '../questions/Questions';

const MainComponent: FC<any> = () => {

    const [isLandingPage, setIsLandingPage] = useState<boolean>(true)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    const {resetGame, resetRound} = useStateContext()

    const openAdminPage = () => {
        setIsLandingPage(false)
        setIsAdmin(true)
    }

    const openPlayersPage = () => {
        setIsLandingPage(false)
        setIsAdmin(false)
    }

    
    return(
        <>
            <Box>
                <AppBar position="static">
                    <Toolbar>
                    
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left'}}>
                            {HEADER}
                        </Typography>
                        <Button color="inherit" style={{maxWidth: '130px', minWidth: '130px'}} 
                            onClick={openPlayersPage}>Player</Button>
                        <Button color="inherit" style={{maxWidth: '130px', minWidth: '130px'}} 
                            onClick={openAdminPage}>Admin</Button>

                        <Button color="inherit" 
                            style={{maxWidth: '130px', minWidth: '130px'}}
                            onClick={() => resetRound()}>Reset round</Button>
                        <Button color="inherit" 
                            style={{maxWidth: '130px', minWidth: '130px'}}
                            onClick={() => resetGame()}
                            >Reset game</Button>
                        <Button color="inherit" 
                            style={{maxWidth: '130px', minWidth: '130px'}}
                            onClick={() => setIsLandingPage(true)}
                            >My questions</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <br></br>
            <Container >
                {isLandingPage
                ?
                <Questions />
                :
                isAdmin ? <AdminsPage /> : <PlayersPage />}
            </Container>
        </>)
}

MainComponent.displayName = 'MainComponent';

export default MainComponent;