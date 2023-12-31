import { FC, Fragment, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { generateRandomNumbers } from '../../commonFunctions/functions';
import { Typography } from '@mui/material';
import { useStateContext } from '../../stateContext/StateContext';
import { LotteryTicket, PopupWindowProps, Result } from '../../interfaces/interfaces';
import ResultInfo from './ResultInfo';
import { UserType } from '../../interfaces/enums';
import { PRICE_OF_TICKET, PRIZE_FOR_FIVE, PRIZE_FOR_FOUR, PRIZE_FOR_THREE, PRIZE_FOR_TWO } from '../../interfaces/constants';


const DrawPopupWindow: FC<PopupWindowProps> = ({open, setOpen}) => {

  const {draw, lotteryTickets, updateDrawnTickets, lotteryLoses, winLottary} = useStateContext()
  const [drawnNumbers, setdrawnNumbers] = useState<number[] | null>(null)
  const [winResults, setWinResults] = useState<Result | null>(null)

  const unplayedTickets = useMemo(() => {
    return lotteryTickets.filter(({drawConducted}) => !drawConducted)
  }, [lotteryTickets])

  const checkForWinningTickets = (numbers: number[]) => {
    const tickets = new Array<LotteryTicket>()

    unplayedTickets.forEach(e => {
      tickets.push({
        user: {userType: e.user.userType, userName: '', balance: 0},
        purchased: new Date(e.purchased),
        selectedNumbers: [...e.selectedNumbers],
        drawConducted: true
      })
    })

    let winnersOf5 = 0;
    let winnersOf4 = 0;
    let winnersOf3 = 0;
    let winnersOf2 = 0;
    tickets.forEach(element => {
      const matchingNumbers = element.selectedNumbers.filter( number => numbers.includes(number))
      if(matchingNumbers.length >= 2){
        element.winningNumbers = matchingNumbers;
      }

      if(matchingNumbers.length === 2){
        winnersOf2++
        element.amountWon = PRIZE_FOR_TWO
      }else if(matchingNumbers.length === 3){
        winnersOf3++
        element.amountWon = PRIZE_FOR_THREE
      }else if(matchingNumbers.length === 4){
        winnersOf4++
        element.amountWon = PRIZE_FOR_FOUR
      }else if(matchingNumbers.length === 5){
        winnersOf5++
        element.amountWon = PRIZE_FOR_FIVE
      }
    });


    return {tickets, winnersOf5, winnersOf4, winnersOf3, winnersOf2}
  }

  const applyWinAmountOfPlayer = (tickets: LotteryTicket[]) => {
    let totalAMountWon = 0;
    tickets.forEach(ticket => {
      if(ticket.user.userType === UserType.PLAYER && ticket.amountWon){
        totalAMountWon += ticket.amountWon
      }
    });
    if(totalAMountWon > 0){
      winLottary(totalAMountWon)
    }
  }

  const drawNumbers = () =>{
    const numbers = generateRandomNumbers()
    
    setdrawnNumbers(numbers.sort((a, b) => a - b))

    draw({
      conductedOn: new Date(),
      selectedNumbers: numbers
    })

    const results = checkForWinningTickets(numbers)
    const {tickets, winnersOf2, winnersOf3, winnersOf4, winnersOf5} = results;

    const totalWonAmount = (winnersOf2 * PRIZE_FOR_TWO) + (winnersOf3 * PRIZE_FOR_THREE) + (winnersOf4 * PRIZE_FOR_FOUR) + (winnersOf5 * PRIZE_FOR_FIVE)

    setWinResults({
      totalTickets: tickets.length,
      totalIncome: tickets.length * PRICE_OF_TICKET,
      totalWonAmount: totalWonAmount,
      totalProfit: (tickets.length * PRICE_OF_TICKET) - totalWonAmount,
      winnersOf2: winnersOf2,
      winnersOf3: winnersOf3,
      winnersOf4: winnersOf4, 
      winnersOf5: winnersOf5
    })
    lotteryLoses(totalWonAmount)
    applyWinAmountOfPlayer(tickets)
    updateDrawnTickets(tickets)
  }




  const handleClose = () => {
    setWinResults(null)
    setdrawnNumbers(null)
    setOpen(false);
  };

  return (
    <Fragment>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        data-testid="admin-draw-popup-dialog"
      >
        <DialogTitle data-testid="admin-draw-popup-title">Draw 5 random numbers</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{marginBottom: '8px'}}
          >
            {!drawnNumbers && 'Click on the button to star.'}
          </DialogContentText>
          <Box
            data-testid="admin-draw-popup-box"
            noValidate
            component="form"
            sx={{
              display: 'flex',
              width: 'auto',
              maxWidth: '600px',
              flexWrap: 'wrap'
              
            }}
          > 
            
              {drawnNumbers ? 
              <Typography variant="h5" sx={{marginLeft: '5px', paddingTop: '3px'}}>
                {`Numbers are: ${drawnNumbers.toLocaleString()}`}
              </Typography>
              :
              <Button variant='outlined'
              style={{maxWidth: '110px', minWidth: '110px'}}
              onClick={drawNumbers}
              data-testid="admin-draw-popup-draw-button"
              >Draw</Button>
              }
              
          </Box>

          {winResults && <ResultInfo result={winResults}/>}
        </DialogContent>
        <DialogActions>
            <Button variant='outlined'
                data-testid="admin-draw-popup-close-button"
                color='error'
                style={{maxWidth: '110px', minWidth: '110px'}}
                onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}


DrawPopupWindow.displayName = 'DrawPopupWindow';

export default DrawPopupWindow;