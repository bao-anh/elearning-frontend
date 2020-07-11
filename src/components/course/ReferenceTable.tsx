import React, { FunctionComponent } from 'react';
import { ROW_PER_PAGE } from '../../enum';
import '../../resources/scss/component/referenceTable.scss';

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
  id: 'name' | 'link';
  label: string;
  minWidth?: number;
  align?: 'center' | 'left';
}

const columns: Column[] = [
  { id: 'name', label: 'Tên tài liệu', minWidth: 300, align: 'left' },
  { id: 'link', label: 'Đường dẫn', minWidth: 100, align: 'left' },
];

const MemberTable: FunctionComponent<{
  topicState: any;
}> = ({ topicState }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(ROW_PER_PAGE);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const renderRowValue = (document: any, columnId: any) => {
    if (columnId === 'name') {
      return <div className='document-table-row'>{document.name}</div>;
    } else if (columnId === 'link') {
      return (
        <a
          href={document.link}
          target='blank'
          className='document-table-row'
          style={{ textDecoration: 'none' }}
        >
          {document.link}
        </a>
      );
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
            {topicState.largeTopic.documentIds
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((document: any, index: number) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {renderRowValue(document, column.id)}
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
        count={topicState.largeTopic.documentIds.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default MemberTable;
