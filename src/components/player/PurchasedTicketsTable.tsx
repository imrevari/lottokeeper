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

const PurchasedTicketsTable: FC<TableProps> = ({rows}) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: '650px', maxWidth: '650px' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{width: '200px'}}>Date purchased</TableCell>
            <TableCell >Selected numbers</TableCell>
            <TableCell >Draw conducted</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({purchased, selectedNumbers, drawConducted}, index) => (
            <TableRow
              key={index}
            >
              <TableCell component="th" scope="row">
                {new Date(purchased.getTime()).toLocaleString()}
              </TableCell>
              <TableCell >{selectedNumbers.toLocaleString()}</TableCell>
              <TableCell >{drawConducted ? 'yes' : 'no'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

PurchasedTicketsTable.displayName = 'PurchasedTicketsTable';

export default PurchasedTicketsTable;