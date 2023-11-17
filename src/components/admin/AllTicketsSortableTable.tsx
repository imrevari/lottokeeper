import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FC } from 'react';
import { LotteryTicket } from '../../interfaces/interfaces';
import { UserType } from '../../interfaces/enums';


interface TableProps {
    rows: LotteryTicket[]
}

const AllTicketsSortableTable: FC<TableProps> = ({rows}) => {
  return (
    <TableContainer sx={{marginTop: '10px'}}>
      <Table sx={{ minWidth: '850px', maxWidth: '100%'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{width: '200px'}}>Date purchased</TableCell>
            <TableCell >selected numbers</TableCell>
            <TableCell >Purchased by</TableCell>
            <TableCell >Draw conducted</TableCell>
            <TableCell >Successful guesses</TableCell>
            <TableCell >Amount won</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({purchased, selectedNumbers, user:{userType}, drawConducted, amountWon, winningNumbers}, index) => (
            <TableRow
              key={index}
            >
              <TableCell component="th" scope="row">
                {new Date(purchased.getTime()).toLocaleString()}
              </TableCell>
              <TableCell >{selectedNumbers.toLocaleString()}</TableCell>
              <TableCell >{userType == UserType.PLAYER ? 'player' : 'robot'}</TableCell>
              <TableCell align="left">{drawConducted ? 'yes' : 'no'}</TableCell>
              <TableCell >{winningNumbers && (selectedNumbers.filter((number) => winningNumbers.includes(number))).toLocaleString()}</TableCell>
              <TableCell >{amountWon && amountWon.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

AllTicketsSortableTable.displayName = 'AllTicketsSortableTable';

export default AllTicketsSortableTable;