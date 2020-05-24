import React, { FunctionComponent, useState } from 'react';
import Moment from 'react-moment';
import AssignmentDialogResult from './AssignmentDialogResult';

import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

interface Column {
  id: 'date' | 'score' | 'button';
  label: string;
  minWidth?: number;
  align?: 'center';
}

const columns: Column[] = [
  { id: 'date', label: 'Thời gian thực hiện', minWidth: 100 },
  { id: 'score', label: 'Điểm', minWidth: 100 },
  { id: 'button', label: '', minWidth: 100 },
];

const YourActivity: FunctionComponent<{
  assignmentState: any;
  authState: any;
}> = ({ assignmentState, authState }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openResult, handleOpenResult] = useState(-1);

  const { participantIds, questionIds } = assignmentState.data;

  const yourParticipantIds = participantIds.filter((participant: any) => {
    if (authState._id === participant.userId._id) return true;
    else return false;
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const renderRowValue = (participant: any, columnId: any, index: number) => {
    if (columnId === 'button')
      return (
        <Button
          color='primary'
          variant='contained'
          onClick={() => handleOpenResult(index)}
        >
          Xem lại
        </Button>
      );
    else if (columnId === 'date')
      return (
        <span>
          <Moment format='HH:mm'>{participant.date}</Moment> {` ngày `}
          <Moment format='DD/MM/YYYY'>{participant.date}</Moment>
        </span>
      );
    else if (columnId === 'score')
      return `${Math.round((participant.score / 100) * questionIds.length)}/${
        questionIds.length
      }`;
  };

  return (
    <Paper className={classes.root}>
      {openResult !== -1 ? (
        <AssignmentDialogResult
          assignment={assignmentState.data}
          openResult={openResult}
          handleOpenResult={handleOpenResult}
        />
      ) : null}
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align='center'
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {yourParticipantIds
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((participant: any, index: number) => {
                return (
                  <TableRow
                    hover
                    role='checkbox'
                    tabIndex={-1}
                    key={participant._id}
                  >
                    {columns.map((column) => {
                      return (
                        <TableCell key={column.id} align='center'>
                          {renderRowValue(
                            participant,
                            column.id,
                            page * rowsPerPage + index
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component='div'
        count={yourParticipantIds.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default YourActivity;
