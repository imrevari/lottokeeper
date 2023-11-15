
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, Fragment } from 'react';



const DrowPopupWindow: FC<any> = ({open, setOpen}) => {



  const handleClose = () => {
    setOpen(false);
  };

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
                {/* {numbers.map(e => 
                    <Avatar
                    sx= {{
                        margin: '1.5px',
                        bgcolor: selectedNumbers.includes(e) ? 'red' : ''
                    }}
                    onClick={() => addToSelectedList(e)}
                    >{e}</Avatar>
                    
                    )} */}
          </Box>
        </DialogContent>
        <DialogActions>
            <Button variant='outlined'
                style={{maxWidth: '110px', minWidth: '110px'}}
                >Purchase</Button>
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