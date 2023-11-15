
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, Fragment, useMemo, useState } from 'react';
import { generateRandomNumbers } from '../../commonFunctions/functions';
import { Typography } from '@mui/material';
import { useStateContext } from '../../stateContext/StateContext';



const DrowPopupWindow: FC<any> = ({open, setOpen}) => {

  const {draw, lotteryTickets} = useStateContext()
  const [drownNumbers, setDrownNumbers] = useState<number[] | null>(null)
  const [winResults, setWinResults] = useState<any>()

  const unplayedTickets = useMemo(() => {
    return lotteryTickets.filter(({drawConducted}) => !drawConducted)
  }, [lotteryTickets])

  const checkForWinningTickets = (numbers: number[]) => {
    let tickets = [...unplayedTickets]
    let winnersOf5 = 0;
    let winnersOf4 = 0;
    let winnersOf3 = 0;
    let winnersOf2 = 0;


    tickets.forEach(element => {
      element.drawConducted = true;
      const matchingNumbers = element.selectedNumbers.filter( number => numbers.includes(number))
      if(matchingNumbers.length >= 2){
        element.winningNumbers = matchingNumbers;
      }

      if(matchingNumbers.length === 2){
        winnersOf2++
        element.amountWon = 10
      }else if(matchingNumbers.length === 3){
        winnersOf3++
        element.amountWon = 25
      }else if(matchingNumbers.length === 4){
        winnersOf4++
        element.amountWon = 50
      }else if(matchingNumbers.length === 5){
        winnersOf5++
        element.amountWon = 100
      }
    });


    return {tickets, winnersOf5, winnersOf4, winnersOf3, winnersOf2}
  }

  const drawNumbers = () =>{
    const numbers = generateRandomNumbers()
    
    setDrownNumbers(numbers.sort((a, b) => a - b))
    draw({
      conductedOn: new Date(),
      selectedNumbers: numbers
    })

    const results = checkForWinningTickets(numbers)
    
    const totalWonAmount = (results.winnersOf2 * 10) + (results.winnersOf3 * 25) + (results.winnersOf4 * 50) + (results.winnersOf5 * 100)
    setWinResults({
      totalTickets: results.tickets.length,
      totalIncome: results.tickets.length * 500,
      totalWonAmount: totalWonAmount,
      totalProfit: (results.tickets.length * 500) - totalWonAmount,
      winnersOf2: results.winnersOf2,
      winnersOf3: results.winnersOf3,
      winnersOf4: results.winnersOf4, 
      winnersOf5: results.winnersOf5
    })


    //update all the tickets purchased so far
    //make evaluation for the table
  }




  const handleClose = () => {
    setWinResults(null)
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