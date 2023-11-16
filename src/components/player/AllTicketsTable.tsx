import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FC } from 'react';
import { LotteryTicket } from '../../interfaces/interfaces';


interface TableProps {
    rows: LotteryTicket[]
}

const AllTicketsTable: FC<TableProps> = ({rows}) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: '850px', maxWidth: '850px' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{width: '200px'}}>Date purchased</TableCell>
            <TableCell >selected numbers</TableCell>
            <TableCell >draw conducted</TableCell>
            <TableCell >Successful guesses</TableCell>
            <TableCell >Amount won</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({purchased, selectedNumbers, drawConducted, amountWon, winningNumbers}, index) => (
            <TableRow
              key={index}
            >
              <TableCell component="th" scope="row">
                {new Date(purchased.getTime()).toLocaleString()}
              </TableCell>
              <TableCell >{selectedNumbers.toLocaleString()}</TableCell>
              <TableCell >{drawConducted ? 'yes' : 'no'}</TableCell>
              <TableCell >{winningNumbers && (selectedNumbers.filter((number) => winningNumbers.includes(number))).toLocaleString()}</TableCell>
              <TableCell >{amountWon && amountWon.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

AllTicketsTable.displayName = 'AllTicketsTable';

export default AllTicketsTable;