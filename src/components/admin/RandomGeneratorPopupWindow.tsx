
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



const RandomGeneratorPopupWindow: FC<any> = ({open, setOpen}) => {


    const {purchaseTicket} = useStateContext()
    const [number, setNumber] = useState<number>(1)

  const handleClose = () => {
    setOpen(false);
  };

  const handleNumberChange = (value: string) => {
    const number = parseInt(value)
    if(number > 25){
        setNumber(25)
    }else if(Number.isNaN(number)){
        setNumber(1)
    }else{
        setNumber(number)
    }
  }

  const generateRandomNumbers = () => {
        let array = new Array<number>()
        let numbers = Array.from({length: 51}, (_, i) => i + 1);
        while (array.length < 5){
            const index = Math.floor(Math.random()*numbers.length)
            array.push(numbers[index])
            numbers.splice(index, 1);
        }
        return array
  }

  const generateRandomPurchases = () =>{
    for (let i = 0; i < number; i++) {
        const numbers = generateRandomNumbers()
        purchaseTicket(500, {
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
      >
        <DialogTitle>Generate random players' purchases</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{marginBottom: '8px'}}
          >
            Select the number of players you would like to generate games for (1 to 25).
          </DialogContentText>
          <Box
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
                    value={number}
                    min={1}
                    max={25}
                    onChange={(e) => handleNumberChange(e.target.value)}
                /> 
                <Button variant='outlined'
                    style={{maxWidth: '110px', minWidth: '110px', marginLeft: '10px'}}
                    onClick={generateRandomPurchases}
                >Generate</Button> 
          </Box>
        </DialogContent>
        <DialogActions>
            <Button variant='outlined'
                color='error'
                style={{maxWidth: '110px', minWidth: '110px'}}
                onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}


RandomGeneratorPopupWindow.displayName = 'RandomGeneratorPopupWindow';

export default RandomGeneratorPopupWindow;