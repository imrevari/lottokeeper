import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FC, useEffect, useState } from 'react';
import { LotteryTicket } from '../../interfaces/interfaces';
import { UserType } from '../../interfaces/enums';
import { TableSortLabel } from '@mui/material';


interface TableProps {
    rows: LotteryTicket[]
}

interface IsAscending{
    purchased: boolean;
    selectedNumbers: boolean;
    userType: boolean;
    drawConducted: boolean;
    winningNumbers: boolean;
    amountWon: boolean;
}

type Rows = 'purchased' | 'selectedNumbers' | 'userType' | 'drawConducted' | 'winningNumbers' | 'amountWon';

const AllTicketsSortableTable: FC<TableProps> = ({rows}) => {


    const [sortedRows, setSortedRows] = useState<LotteryTicket[]>(rows)

    const [isAscending, setIsAscending] = useState<IsAscending>({
        purchased: false,
        selectedNumbers: false,
        userType: false,
        drawConducted: false,
        winningNumbers: false,
        amountWon: false,
    })

    useEffect(() => {setSortedRows(rows)}, [rows])

    const sorting = (row: Rows) => {
        const stateCopy = {...isAscending}
        const isRowAsc = stateCopy[row]
        setIsAscending({...stateCopy, [row]: !isRowAsc})
        sortRows(row)
    }

    const sortRows = (row: Rows) => {
        const rowClone = [...sortedRows];
        switch (row) {
            case 'winningNumbers':
                rowClone.sort(({winningNumbers: a}, {winningNumbers: b} ) => 
                isAscending[row] ?
                (b ? b.length : 0) - (a ? a.length : 0)
                :
                (a ? a.length : 0) - (b ? b.length : 0))
                break;
            case 'userType': 
                rowClone.sort(({user:{userType: a}}, {user:{userType: b}} ) => 
                isAscending[row] ? a - b : b - a)
                break;
            case 'drawConducted':
                rowClone.sort(({drawConducted: a}, {drawConducted: b} ) => 
                isAscending[row] ? ((a === b)? 0 : a? -1 : 1) : ((a === b)? 0 : a? 1 : -1))
                break;
            case 'amountWon':
                rowClone.sort(({amountWon: a}, {amountWon: b} ) => 
                isAscending[row] ? ((a ?? 0) - (b ?? 0)) : ((b ?? 0) - (a ?? 0)))
                break;
            case 'purchased':
                rowClone.sort(({purchased: a}, {purchased: b} ) => 
                isAscending[row] ? (a.getTime() - b.getTime()) : (b.getTime() - a.getTime()))
                break;
        }
        setSortedRows(rowClone)
    }




  return (
    <TableContainer sx={{marginTop: '10px'}} data-testid="admin-sortable-table-container">
      <Table sx={{ minWidth: '850px', maxWidth: '100%'}} aria-label="simple table" data-testid="admin-sortable-table-table">
        <TableHead data-testid="admin-sortable-table-header">
          <TableRow>
            <TableCell sx={{width: '18%'}}>
                {`Date purchased`}
                <TableSortLabel
                    data-testid="admin-sortable-table-purchased-button"
                    active={true}
                    direction={isAscending['purchased'] ? 'asc' : 'desc'}
                    onClick={() => sorting('purchased')}
                />
            </TableCell>
            <TableCell sx={{width: '17%'}}>
                {`Selected numbers`}
                {/* <TableSortLabel
                    id={'selectedNumbers'}
                    active={true}
                    direction={isAscending['selectedNumbers'] ? 'asc' : 'desc'}
                    onClick={() => sorting('selectedNumbers')}
                /> */}
            </TableCell>
            <TableCell sx={{width: '15%'}}>
                {`Purchased by`}
                <TableSortLabel
                    data-testid="admin-sortable-table-userType-button"
                    active={true}
                    direction={isAscending['userType'] ? 'asc' : 'desc'}
                    onClick={() => sorting('userType')}
                />
            </TableCell>
            <TableCell sx={{width: '15%'}}>
                {`Draw conducted`}
                <TableSortLabel
                    data-testid="admin-sortable-table-drawConducted-button"
                    active={true}
                    direction={isAscending['drawConducted'] ? 'asc' : 'desc'}
                    onClick={() => sorting('drawConducted')}
                />
            </TableCell>
            <TableCell sx={{width: '20%'}} >
                {`Successful guesses`}
                <TableSortLabel
                    data-testid="admin-sortable-table-winningNumbers-button"
                    active={true}
                    direction={isAscending['winningNumbers'] ? 'asc' : 'desc'}
                    onClick={() => sorting('winningNumbers')}
                />
            </TableCell>
            <TableCell sx={{width: '15%'}} >
                {`Amount won`}
                <TableSortLabel
                    data-testid="admin-sortable-table-amountWon-button"
                    active={true}
                    direction={isAscending['amountWon'] ? 'asc' : 'desc'}
                    onClick={() => sorting('amountWon')}
                />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody data-testid="admin-sortable-table-body">
          {sortedRows.map(({purchased, selectedNumbers, user:{userType}, drawConducted, amountWon, winningNumbers}, index) => (
            <TableRow
              key={index}
              data-testid={`admin-sortable-table-row-${index}`}
            >
              <TableCell component="th" scope="row">
                {new Date(purchased.getTime()).toLocaleString()}
              </TableCell>
              <TableCell >{selectedNumbers.toLocaleString()}</TableCell>
              <TableCell >{userType === UserType.PLAYER ? 'player' : 'robot'}</TableCell>
              <TableCell align="left">{drawConducted ? 'yes' : 'no'}</TableCell>
              <TableCell >{winningNumbers && winningNumbers.toLocaleString()}</TableCell>
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