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

const AllTicketsAdminTable: FC<TableProps> = ({rows}) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: '650px', maxWidth: '650px' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{width: '200px'}}>Date purchased</TableCell>
            <TableCell >selected numbers</TableCell>
            <TableCell >Purchased by</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({purchased, selectedNumbers, user:{userType}}, index) => (
            <TableRow
              key={index}
            >
              <TableCell component="th" scope="row">
                {new Date(purchased.getTime()).toLocaleString()}
              </TableCell>
              <TableCell >{selectedNumbers.toLocaleString()}</TableCell>
              <TableCell >{userType == UserType.PLAYER ? 'player' : 'robot'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

AllTicketsAdminTable.displayName = 'AllTicketsAdminTable';

export default AllTicketsAdminTable;