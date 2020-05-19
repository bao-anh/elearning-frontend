import React, { useEffect, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import * as categoryAction from '../../redux/actions/category';
import * as courseAction from '../../redux/actions/course';
import queryString from 'query-string';
import BreadCrumb from '../../components/BreadCrumb';
import '../../resources/scss/about.scss';
import '../../resources/scss/main.scss';
import '../../resources/scss/category.scss';

import {
  List,
  ListItem,
  Collapse,
  ListItemText,
  Grid,
  Paper,
} from '@material-ui/core';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';

const CategoryPage: FunctionComponent<{
  fetchAllCategory: Function;
  fetchCourseByCategoryId: Function;
  location: any;
  match: any;
  categoryState: any;
}> = ({
  fetchAllCategory,
  fetchCourseByCategoryId,
  location,
  categoryState,
  match,
}) => {
  useEffect(() => {
    if (location.search) {
      const parsed = queryString.parse(location.search);
      if (parsed.categoryId) fetchCourseByCategoryId(Number(parsed.categoryId));
    }
    fetchAllCategory();
    //eslint-disable-next-line
  }, [location.search]);

  return (
    <React.Fragment>
      <BreadCrumb path={match.path} />
      <Grid container className='container'>
        <Grid item xs={3}>
          <Paper elevation={1}>
            <List component='nav' aria-labelledby='nested-list-subheader'>
              <ListItem button>
                <ListItemText primary='Tất cả khóa học' />
              </ListItem>
              <ListItem button>
                <ListItemText primary='Khóa học của tôi' />
              </ListItem>
              {categoryState.data.map((category: any) =>
                category.childrentType === 1 ? (
                  <List key={category.id} className='category-item-list'>
                    <ListItem button>
                      <Link
                        to={`?categoryId=${category.id}`}
                        className='category-link'
                      >
                        {category.name}
                      </Link>
                      {category.childrentIds.length ? (
                        category.id.toString() ===
                        queryString.parse(location.search).categoryId ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )
                      ) : null}
                    </ListItem>
                    <Collapse
                      in={
                        category.childrentIds.length &&
                        category.id.toString() ===
                          queryString.parse(location.search).categoryId
                      }
                      timeout='auto'
                    >
                      <List>
                        {category.childrentIds.length &&
                          categoryState.data.map((categoryChildren: any) =>
                            category.childrentIds.includes(
                              categoryChildren.id
                            ) ? (
                              <ListItem key={categoryChildren.id} button>
                                <Link
                                  to={`?categoryId=${category.id}`}
                                  className='category-children-link'
                                >
                                  {categoryChildren.name}
                                </Link>
                              </ListItem>
                            ) : null
                          )}
                      </List>
                    </Collapse>
                  </List>
                ) : null
              )}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper elevation={1} className='category-content'>
            test
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState, ownProps: any) => {
  return {
    categoryState: state.categoryState,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllCategory: () => dispatch(categoryAction.fetchAllCategory()),
  fetchCourseByCategoryId: (categoryId: number) =>
    dispatch(courseAction.fetchCourseByCategoryId(categoryId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
