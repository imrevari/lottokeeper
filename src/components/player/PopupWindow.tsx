
import { Avatar, AvatarGroup  } from '@mui/material';
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
        //make message it is larges
    }else{
        setSelectedNumbers(prevState => [...prevState, number])
    }
  }

  const handleClose = () => {
    setSelectedNumbers([])
    setOpen(false);
  };

  const buyTicket = () =>{
    if(selectedNumbers.length < 5) {
        //make notification
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
        <DialogTitle>Optional sizes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can set my maximum width and whether to adapt or not.
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
                onClick={buyTicket}>Purchase</Button>
            <Button variant='outlined'
                color='error'
                style={{maxWidth: '110px', minWidth: '110px'}}
                onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}


PopupWindow.displayName = 'PopupWindow';

export default PopupWindow;