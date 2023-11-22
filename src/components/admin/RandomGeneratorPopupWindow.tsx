
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, Fragment, useState } from 'react';
import { UserType } from '../../interfaces/enums';
import { useStateContext } from '../../stateContext/StateContext';
import { generateRandomNumbers } from '../../commonFunctions/functions';
import { MAX_ROBOT_DRAWS, PRICE_OF_TICKET } from '../../interfaces/constants';
import { PopupWindowProps } from '../../interfaces/interfaces';



const RandomGeneratorPopupWindow: FC<PopupWindowProps> = ({open, setOpen}) => {


    const {purchaseTicket} = useStateContext()
    const [number, setNumber] = useState<number>(1)

  const handleClose = () => {
    setNumber(1);
    setOpen(false);
  };

  const handleNumberChange = (value: string) => {
    const number = parseInt(value)
    if(number > MAX_ROBOT_DRAWS){
        setNumber(MAX_ROBOT_DRAWS)
    }else if(Number.isNaN(number)){
        setNumber(1)
    }else{
        setNumber(number)
    }
  }

  const generateRandomPurchases = () =>{
    for (let i = 0; i < number; i++) {
        const numbers = generateRandomNumbers()
        purchaseTicket(PRICE_OF_TICKET, {
            user: {userType: UserType.FAKE_PLAYER, userName: '', balance: 0},
            purchased: new Date(),
            selectedNumbers: numbers.sort((a, b) => a - b),
            drawConducted: false
        })
      }
      handleClose()
  }

  return (
    <Fragment>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        data-testid="admin-random-popup-dialog"
      >
        <DialogTitle data-testid="admin-random-popup-dialog-title">Generate random players' purchases</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{marginBottom: '8px'}}
          >
            {`Select the number of players you would like to generate games for (1 to ${MAX_ROBOT_DRAWS}).`}
          </DialogContentText>
          <Box
            data-testid="admin-random-popup-box"
            noValidate
            component="form"
            sx={{
              display: 'flex',
              width: 'auto',
              maxWidth: '500px',
              flexWrap: 'wrap'
              
            }}
          >
                <input
                    type='number'
                    data-testid="admin-random-popup-input"
                    value={number}
                    min={1}
                    max={MAX_ROBOT_DRAWS}
                    onChange={(e) => handleNumberChange(e.target.value)}
                /> 
                <Button variant='outlined'
                    data-testid="admin-random-popup-generate-button"
                    style={{maxWidth: '110px', minWidth: '110px', marginLeft: '10px'}}
                    onClick={generateRandomPurchases}
                >Generate</Button> 
          </Box>
        </DialogContent>
        <DialogActions>
            <Button variant='outlined'
                color='error'
                data-testid="admin-random-popup-close-button"
                style={{maxWidth: '110px', minWidth: '110px'}}
                onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}


RandomGeneratorPopupWindow.displayName = 'RandomGeneratorPopupWindow';

export default RandomGeneratorPopupWindow;