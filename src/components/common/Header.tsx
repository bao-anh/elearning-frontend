import React, { FunctionComponent } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import { withRouter } from 'react-router-dom';
import { removeToken } from '../../services';
import Routes from '../../routes';
import * as authAction from '../../redux/actions/auth';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from '@material-ui/core';
import Logo from '../../resources/images/logo.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    appBar: {
      display: 'flex',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      flexGrow: 1,
      marginRight: '10px',
      marginLeft: '10px',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    titleNoFlexGrow: {
      display: 'none',
      marginLeft: '10px',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '250px',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  })
);

const Header: FunctionComponent<{
  history: any;
  location: any;
  logout: any;
  authState: any;
}> = ({ authState, history, location, logout }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    removeToken();
    logout();
    handleMenuClose();
    history.push('/signin');
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Thông tin cá nhân</MenuItem>
      <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
    </Menu>
  );

  const renderHeader = () => {
    if (
      location.pathname !== Routes.SIGNIN_SCREEN &&
      location.pathname !== Routes.REGISTER_SCREEN
    ) {
      return (
        <React.Fragment>
          <Link href='/' className={'logo-web'}>
            <img alt='' src={Logo} />
          </Link>
          <Typography className={classes.titleNoFlexGrow} variant='h6' noWrap>
            E-LEARNING
          </Typography>
          <div className={classes.grow}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='Tìm kiếm khóa học...'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </div>
          <div className={classes.sectionDesktop}>
            <IconButton aria-label='translate' color='inherit'>
              <GTranslateIcon />
            </IconButton>
            <IconButton
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Link href='/' className={'logo-web'}>
            <img alt='' src={Logo} />
          </Link>
          <Typography className={classes.title} variant='h6' noWrap>
            E-LEARNING
          </Typography>
          <div className={classes.sectionDesktop}>
            <IconButton aria-label='translate' color='inherit'>
              <GTranslateIcon />
            </IconButton>
          </div>
        </React.Fragment>
      );
    }
  };

  return (
    <div>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>{renderHeader()}</Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};

const mapStateToProps = (state: AppState, ownProps: any) => {
  return {
    authState: state.authState,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch(authAction.logout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
