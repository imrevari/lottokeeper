
import { Alert, Avatar, AvatarGroup, Snackbar  } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, Fragment, useState } from 'react';
import { useStateContext } from '../../stateContext/StateContext';
import { PRICE_OF_TICKET } from '../../interfaces/constants';



const PopupWindow: FC<any> = ({open, setOpen}) => {


    const {player, purchaseTicket} = useStateContext()

    const [snackBarOpened, setSnackBarOpened] = useState<boolean>(false)

    const handleSnackBarClose = () =>{
        setSnackBarOpened(false);
    }
  
  const numbers = Array.from({length: 51}, (_, i) => i + 1);

  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  const addToSelectedList = (number: number) => {
    if(selectedNumbers.includes(number)){
        const arrayCopy = [...selectedNumbers]
        const index = arrayCopy.indexOf(number);
            if (index > -1) {
                arrayCopy.splice(index, 1);
            }
        setSelectedNumbers(arrayCopy)
    }else if(selectedNumbers.length >= 5){
        setSnackBarOpened(true)
    }else{
        setSelectedNumbers(prevState => [...prevState, number])
    }
  }

  const handleClose = () => {
    setSelectedNumbers([])
    handleSnackBarClose()
    setOpen(false);
  };

  const buyTicket = () =>{
    if(selectedNumbers.length < 5) {
        //make notification
        setSnackBarOpened(true)
    }else{
        purchaseTicket(PRICE_OF_TICKET, {
            user: player,
            purchased: new Date(),
            selectedNumbers: selectedNumbers.sort((a, b) => a - b),
            drawConducted: false
        })
        handleClose()
    }
  }

  return (
    <Fragment>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Buy Lottery ticket</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{marginBottom: '8px'}}
          >
            Select five numbers from 1 to 51.
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              width: 'auto',
              maxWidth: '600px',
              flexWrap: 'wrap'
              
            }}
          >
                {numbers.map(e => 
                    <Avatar
                    sx= {{
                        margin: '1.5px',
                        bgcolor: selectedNumbers.includes(e) ? 'red' : ''
                    }}
                    onClick={() => addToSelectedList(e)}
                    >{e}</Avatar>
                    
                    )}
          </Box>
        </DialogContent>
        <DialogActions>
            <Button variant='outlined'
                style={{maxWidth: '110px', minWidth: '110px'}}
                disabled={selectedNumbers.length < 5}
                onClick={buyTicket}>Purchase</Button>
            <Button variant='outlined'
                color='error'
                style={{maxWidth: '110px', minWidth: '110px'}}
                onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackBarOpened}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
        >
          <Alert severity="error">{selectedNumbers.length >= 5 ? 
          'Cannot select more than 5'
          :
          'Must select five numbers'    
          }</Alert>
        </Snackbar>
    </Fragment>
  );
}


PopupWindow.displayName = 'PopupWindow';

export default PopupWindow;