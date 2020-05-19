import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars({ ...props }) {
  const classes = useStyles();
  const { snackBar, setSnackBar } = props;

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBar({
      ...snackBar,
      isOpen: false,
    });
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={snackBar.isOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity={snackBar.severity} onClose={handleClose}>
          {snackBar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
