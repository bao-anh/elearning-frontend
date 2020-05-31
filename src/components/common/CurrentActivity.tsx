import React, { FunctionComponent } from 'react';
import Moment from 'react-moment';
import { renderNumberOfQuestion } from '../../utils';
import Routes from '../../routes';

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
  id: 'name' | 'date' | 'score';
  label: string;
  minWidth?: number;
  align?: 'center';
}

const columns: Column[] = [
  { id: 'name', label: 'Người thực hiện', minWidth: 100, align: 'center' },
  { id: 'date', label: 'Thời gian thực hiện', minWidth: 100, align: 'center' },
  { id: 'score', label: 'Điểm', minWidth: 100, align: 'center' },
];

const CurrentActivity: FunctionComponent<{
  participantIds: any;
  questionIds: any;
  match: any;
}> = ({ participantIds, questionIds, match }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const currentParticipantIds = participantIds.filter((participant: any) => {
    if (match.path === Routes.TEST_SCREEN) {
      if (match.params.part === 'full-test') {
        if (participant.testId.questionIds.length > 50) return true;
        else return false;
      } else {
        if (participant.testId.questionIds.length < 50) return true;
        else return false;
      }
    } else return true;
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
    if (columnId === 'name') return participant.userId.name;
    else if (columnId === 'date')
      return (
        <span>
          <Moment format='HH:mm'>{participant.date}</Moment> {` ngày `}
          <Moment format='DD/MM/YYYY'>{participant.date}</Moment>
        </span>
      );
    else if (columnId === 'score') {
      if (match.path === Routes.TEST_SCREEN) {
        return `${Math.round(
          (participant.score / 100) *
            renderNumberOfQuestion(participantIds[index].testId.questionIds)
        )}/${renderNumberOfQuestion(participantIds[index].testId.questionIds)}`;
      } else
        return `${Math.round(
          (participant.score / 100) * renderNumberOfQuestion(questionIds)
        )}/${renderNumberOfQuestion(questionIds)}`;
    }
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentParticipantIds
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
                        <TableCell key={column.id} align={column.align}>
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
        count={participantIds.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CurrentActivity;
