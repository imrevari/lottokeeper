import { List, ListItem, ListItemText } from '@mui/material';
import { FC } from 'react';


const ResultInfo: FC<any> = ({result}) => {

    const {totalTickets, totalIncome, totalWonAmount, totalProfit, winnersOf2, winnersOf3, winnersOf4, winnersOf5} = result;

    return(
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
        <ListItem>
            <ListItemText primary={`Total tickets sold: ${totalTickets}`} />
        </ListItem>
        <ListItem>
            <ListItemText primary={`Total won amount: ${totalWonAmount}`} />
        </ListItem>
        <ListItem>
            <ListItemText primary={`Total income: ${totalIncome}`} />
        </ListItem>
        <ListItem>
            <ListItemText primary={`Total profit: ${totalProfit}`} />
        </ListItem>

        <ListItem>
            <ListItemText primary={`Guessed two numbers: ${winnersOf2}`} />
        </ListItem>
        <ListItem>
            <ListItemText primary={`Guessed three numbers: ${winnersOf3}`} />
        </ListItem>
        <ListItem>
            <ListItemText primary={`Guessed four numbers: ${winnersOf4}`} />
        </ListItem>
        <ListItem>
            <ListItemText primary={`Guessed five numbers: ${winnersOf5}`} />
        </ListItem>
    </List>
    )
}

ResultInfo.displayName = 'ResultInfo';

export default ResultInfo;