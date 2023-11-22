import { FC, useState } from 'react';
import { useStateContext } from '../../stateContext/StateContext';

import { Input } from '@mui/base/Input';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';



const PlayerHeader: FC = () => {

    const {player, changeName} = useStateContext()

    const {balance, userName} = player

    const [isEditMode, setisEditMode] =useState<boolean>(false)
    const [name, setName] =useState<string>(userName)

    const editOrSave = () => {
        if(isEditMode){
            updateName()
        }else{
            setisEditMode(true)
        }
    }

    const updateName = () => {
        changeName(name, true);
        setisEditMode(false)
    }

    return(<>
        <Box >
            <AppBar position="static" color='inherit'>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left'}}>
                        <div>
                            {isEditMode ? 
                            <Input value={name ? name : `unset name`}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter'){
                                    updateName()
                                }
                            }}
                            onChange={(e) => setName(e.target.value)}/> :
                            (userName ? userName : `unset name`).concat(`, your remaining balance is: ${balance.toLocaleString()}`)
                            }
                        </div>
                    </Typography>

                    <Button color="inherit" variant='outlined'
                    style={{maxWidth: '140px', minWidth: '140px'}}
                    onClick={() => editOrSave()}>{isEditMode ? 'Save' : 'Update Name'}</Button>

                </Toolbar>
            </AppBar>
        </Box>
    </>)
}


PlayerHeader.displayName = 'PlayerHeader';

export default PlayerHeader;