
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, Fragment, useState } from 'react';
import { generateRandomNumbers } from '../../commonFunctions/functions';
import { Typography } from '@mui/material';
import { useStateContext } from '../../stateContext/StateContext';



const DrowPopupWindow: FC<any> = ({open, setOpen}) => {

  const {draw} = useStateContext()

  const [drownNumbers, setDrownNumbers] = useState<number[] | null>(null)

  const drawNumbers = () =>{
    const numbers = generateRandomNumbers()
    
    setDrownNumbers(numbers.sort((a, b) => a - b))
    draw({
      conductedOn: new Date(),
      selectedNumbers: numbers
    })
    //select 5 random numbers
    //set the numbers in the draw state
    //update all the tickets purchased so far
    //make evaluation for the table
  }




  const handleClose = () => {
    setDrownNumbers(null)
    setOpen(false);
  };

  return (
    <Fragment>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Draw 5 random numbers</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{marginBottom: '8px'}}
          >
            Click on the button to star.
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
            <Button variant='outlined'
              style={{maxWidth: '110px', minWidth: '110px'}}
              onClick={drawNumbers}
              >Draw</Button>
              {drownNumbers && 
              <Typography variant="h5" sx={{marginLeft: '5px', paddingTop: '3px'}}>
                {`Numbers are: ${drownNumbers.toLocaleString()}`}
              </Typography>}
              
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


DrowPopupWindow.displayName = 'DrowPopupWindow';

export default DrowPopupWindow;