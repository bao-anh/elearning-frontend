import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import { withRouter } from 'react-router-dom';
import { removeToken } from '../../services';
import { Link } from 'react-router-dom';
import Routes from '../../routes';
import * as authAction from '../../redux/actions/auth';
import Logo from '../../resources/images/white-wolf-transparent.png';

import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@material-ui/core';
import {
  AccountCircle,
  GTranslate as GTranslateIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Dashboard as DashboardIcon,
  Dvr as DvrIcon,
  School as SchoolIcon,
  Filter as FilterIcon,
} from '@material-ui/icons';

const drawerWidth = 210;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 15,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(7) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
    },
    titleNoFlexGrow: {
      display: 'none',
      marginLeft: '10px',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    grow: {
      flexGrow: 1,
    },
    inputRoot: {
      color: 'inherit',
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
    title: {
      display: 'none',
      flexGrow: 1,
      marginRight: '10px',
      marginLeft: '10px',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
  })
);

const CustomHeader: FunctionComponent<{
  history: any;
  location: any;
  logout: any;
  authState: any;
  children: any;
}> = ({ authState, history, location, logout, children }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const iconArray = [
    { text: 'Trang chủ', icon: <DashboardIcon /> },
    { text: 'Khóa học', icon: <DvrIcon /> },
    { text: 'Luyện thi TOEIC', icon: <SchoolIcon /> },
    { text: 'Học từ vựng', icon: <FilterIcon /> },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Link to='/' className='logo-web'>
            <img alt='' src={Logo} className='logo' />
          </Link>
          <Typography className={classes.titleNoFlexGrow} variant='h6' noWrap>
            E-LEARNING
          </Typography>
          <div className={classes.grow} />
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
          <Link to='/' className={'logo-web'}>
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

  const renderStyleListItem = (index: number) => {
    const backgroundColor = '#e0e0e0';
    const path = location.pathname.split('/');
    if (path[1] === '') {
      if (index === 0) {
        return { backgroundColor };
      } else return {};
    } else if (
      path[1] === 'assignment' ||
      path[1] === 'lesson' ||
      path[1] === 'topic' ||
      path[1] === 'course' ||
      path[1] === 'category' ||
      path[1] === 'utility'
    ) {
      if (index === 1) {
        return { backgroundColor };
      } else return {};
    } else if (path[1] === 'test' || path[1] === 'toeic') {
      if (index === 2) {
        return { backgroundColor };
      } else return {};
    } else if (path[1] === 'flashcard' || path[1] === 'set') {
      if (index === 3) {
        return { backgroundColor };
      } else return {};
    }
  };

  const handleChangeLink = (index: number) => {
    if (index === 0) history.push('/');
    else if (index === 1) history.push('/category/all');
    else if (index === 2) history.push('/toeic');
    else if (index === 3) history.push('/flashcard');
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>{renderHeader()}</Toolbar>
      </AppBar>
      {renderMenu}
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {iconArray.map((children, index) => (
            <ListItem
              button
              key={children.text}
              style={renderStyleListItem(index)}
              onClick={() => handleChangeLink(index)}
            >
              <ListItemIcon style={{ minWidth: '40px' }}>
                {children.icon}
              </ListItemIcon>
              <ListItemText primary={children.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomHeader)
);
