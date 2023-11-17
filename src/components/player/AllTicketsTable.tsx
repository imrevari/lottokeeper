import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FC, useMemo, useState } from 'react';
import { LotteryTicket } from '../../interfaces/interfaces';
import { TableSortLabel } from '@mui/material';


interface TableProps {
    rows: LotteryTicket[]
}

const AllTicketsTable: FC<TableProps> = ({rows}) => {


  const [isAsc, setIsAsc] = useState<boolean | null>(null)

  const [localRows, setLocalRows] = useState<LotteryTicket[]>(rows)

  const sortRows = () => {

  }

  const amountWon = useMemo(() => {
    let total = 0;
    localRows.map(({amountWon}) => {if(amountWon){total = total + amountWon}})
    return total;
  }, [localRows]) 

  return (
    <TableContainer>
      <Table sx={{ minWidth: '950px', maxWidth: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{width: '25%'}}>Date purchased</TableCell>
            <TableCell sx={{width: '20%'}}>selected numbers</TableCell>
            <TableCell sx={{width: '20%'}}>draw conducted</TableCell>
            <TableCell sortDirection={isAsc ? 'asc' : 'desc'}>
              <TableSortLabel
                sx={{width: '20%'}}
                active={true}
                direction={'desc'}
                onClick={() => console.log('szia')}
              >
                 {`Successful guesses`}
              </TableSortLabel>
              
             
            </TableCell>
            <TableCell sx={{width: '15%'}}>Amount won</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {localRows.map(({purchased, selectedNumbers, drawConducted, amountWon, winningNumbers}, index) => (
            <TableRow
              key={index}
            >
              <TableCell component="th" scope="row">
                {new Date(purchased.getTime()).toLocaleString()}
              </TableCell>
              <TableCell >{selectedNumbers.toLocaleString()}</TableCell>
              <TableCell align="left">{drawConducted ? 'yes' : 'no'}</TableCell>
              <TableCell >{winningNumbers && (selectedNumbers.filter((number) => winningNumbers.includes(number))).toLocaleString()}</TableCell>
              <TableCell >{amountWon && amountWon.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Table sx={{ minWidth: '950px', maxWidth: '100%' }} aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell colSpan={5}></TableCell>
          </TableRow>
          <TableRow>

            <TableCell sx={{width: '75%'}} align="right">Totla amount:</TableCell>
            <TableCell sx={{width: '10%'}}></TableCell>
            <TableCell sx={{width: '15%'}}>{amountWon.toLocaleString()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

AllTicketsTable.displayName = 'AllTicketsTable';

export default AllTicketsTable;