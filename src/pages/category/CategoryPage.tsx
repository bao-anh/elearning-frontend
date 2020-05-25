import React, { useEffect, FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import * as operationAction from '../../redux/actions/operation';
import BreadCrumb from '../../components/BreadCrumb';
import Loading from '../../components/Loading';
import PurchaseDetailDialog from '../../components/PurchaseDetailDialog';
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
  Typography,
} from '@material-ui/core';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Person as PersonIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@material-ui/icons';

const CategoryPage: FunctionComponent<{
  fetchDataInCategoryPage: Function;
  purchaseCourse: Function;
  match: any;
  history: any;
  categoryState: any;
  courseState: any;
  authState: any;
}> = ({
  fetchDataInCategoryPage,
  purchaseCourse,
  categoryState,
  match,
  history,
  courseState,
  authState,
}) => {
  useEffect(() => {
    fetchDataInCategoryPage(match.params, authState._id);
    //eslint-disable-next-line
  }, [match]);

  const [categoryArray, setCategoryArray] = useState(categoryState.data);
  const [isOpenPurchaseDetailCourse, setIsOpenPurchaseDetailCourse] = useState(
    false
  );
  const [forcusCourse, setForcusCourse] = useState(null);

  const handleExpandList = (id: any) => {
    const newCategoryArray = categoryArray.map((category: any) => {
      if (id === category._id) {
        if (category.isOpen) return { ...category, isOpen: !category.isOpen };
        else return { ...category, isOpen: true };
      } else return { ...category };
    });
    setCategoryArray(newCategoryArray);
  };

  const renderCategoryItems = (category: any) => {
    if (category.childrenIds.length) {
      return (
        <React.Fragment key={category._id}>
          <ListItem button onClick={() => handleExpandList(category._id)}>
            <ListItemText primary={category.name} />
            {category.isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={category.isOpen ? category.isOpen : false}>
            <List>
              {category.childrenIds.map((children: any) => (
                <Link
                  key={children._id}
                  to={`/category/${children._id}`}
                  className='category-left-side-link'
                >
                  <ListItem
                    className='category-left-side-item'
                    button
                    style={
                      categoryState.current === children._id
                        ? { backgroundColor: '#e0e0e0' }
                        : {}
                    }
                  >
                    {children.name}
                  </ListItem>
                </Link>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      );
    } else return null;
  };

  const renderPriceOfItem = (course: any) => {
    if (authState.courseIds.length) {
      const isPurchased =
        authState.courseIds.filter(
          (userCourse: any) => userCourse._id === course._id
        ).length > 0;

      return isPurchased ? (
        <React.Fragment>
          {authState.courseIds.map((userCourse: any) =>
            userCourse._id === course._id ? (
              <span key={userCourse._id} style={{ marginRight: '10px' }}>
                {`${
                  course.progressIds[0]
                    ? Math.round(course.progressIds[0].percentComplete * 10) /
                      10
                    : 0
                } %`}
              </span>
            ) : null
          )}
          <div className='category-content-already-purchase'>Đã mua</div>
        </React.Fragment>
      ) : course.currentPrice / course.realPrice < 1 ? (
        <React.Fragment>
          <div className='category-content-sale'>
            {`${100 - (course.currentPrice / course.realPrice) * 100}%`}
            <ArrowDownwardIcon fontSize='inherit' />
          </div>
          <div className='category-content-cost'>
            {course.currentPrice ? `${course.currentPrice}đ` : 'FREE'}
          </div>
        </React.Fragment>
      ) : (
        <div className='category-content-cost'>
          {course.currentPrice ? `${course.currentPrice}đ` : 'FREE'}
        </div>
      );
    } else {
      return course.currentPrice / course.realPrice < 1 ? (
        <React.Fragment key={course._id}>
          <div className='category-content-sale'>
            {`${100 - (course.currentPrice / course.realPrice) * 100}%`}
            <ArrowDownwardIcon fontSize='inherit' />
          </div>
          <div className='category-content-cost'>
            {course.currentPrice ? `${course.currentPrice}đ` : 'FREE'}
          </div>
        </React.Fragment>
      ) : (
        <div key={course._id} className='category-content-cost'>
          {course.currentPrice ? `${course.currentPrice}đ` : 'FREE'}
        </div>
      );
    }
  };

  const handleClickOnCourse = (course: any) => {
    const isPurchased = authState.courseIds.filter(
      (userCourse: any) => userCourse._id === course._id
    ).length;

    if (!authState.courseIds.length) setIsOpenPurchaseDetailCourse(true);
    else if (!isPurchased) setIsOpenPurchaseDetailCourse(true);
    else history.push(`/course/${course._id}`);
  };

  return (
    <React.Fragment>
      <BreadCrumb path={match.path} />
      {forcusCourse ? (
        <PurchaseDetailDialog
          course={forcusCourse}
          purchaseCourse={purchaseCourse}
          isOpenPurchaseDetailCourse={isOpenPurchaseDetailCourse}
          setIsOpenPurchaseDetailCourse={setIsOpenPurchaseDetailCourse}
        />
      ) : null}
      <Grid container className='container'>
        <Grid item xs={3}>
          <Paper elevation={1} className='category-left-side'>
            {categoryState.isLoading ? (
              <Loading />
            ) : (
              <List component='nav' aria-labelledby='nested-list-subheader'>
                <Link to='/category/all' className='category-content-link'>
                  <ListItem
                    button
                    style={
                      categoryState.current === 'all'
                        ? { backgroundColor: '#e0e0e0' }
                        : {}
                    }
                  >
                    <ListItemText primary='Tất cả khóa học' />
                  </ListItem>
                </Link>
                <Link to='/category/me' className='category-content-link'>
                  <ListItem
                    button
                    style={
                      categoryState.current === 'me'
                        ? { backgroundColor: '#e0e0e0' }
                        : {}
                    }
                  >
                    <ListItemText primary='Khóa học của tôi' />
                  </ListItem>
                </Link>
                {categoryArray.map((category: any) =>
                  renderCategoryItems(category)
                )}
              </List>
            )}
          </Paper>
        </Grid>
        <Grid item xs={9}>
          {courseState.data.length ? (
            courseState.data.map((course: any) => (
              <React.Fragment key={course._id}>
                <Paper
                  className='category-content-item'
                  onClick={() => {
                    setForcusCourse(course);
                    handleClickOnCourse(course);
                  }}
                >
                  <div className='category-content-link'>
                    <img
                      src={course.avatar}
                      alt={course.name}
                      className='category-content-avatar'
                    />
                    <div className='category-content-title'>{course.name}</div>
                    <div className='category-content-description'>
                      <Typography variant='subtitle2'>
                        {course.description}
                      </Typography>
                    </div>
                    <div className='category-content-footer'>
                      <div className='category-content-member'>
                        <PersonIcon />
                        <div className='category-content-member-text'>
                          {` ${course.memberIds.length} Học viên`}
                        </div>
                      </div>
                      {renderPriceOfItem(course)}
                    </div>
                  </div>
                </Paper>
              </React.Fragment>
            ))
          ) : (
            <Loading />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState, ownProps: any) => {
  return {
    categoryState: state.categoryState,
    courseState: state.courseState,
    authState: state.authState,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  fetchDataInCategoryPage: (params: any, userId: any) =>
    dispatch(operationAction.fetchDataInCategoryPage(params, userId)),
  purchaseCourse: (courseId: any, onSuccess: any) =>
    dispatch(operationAction.purchaseCourse(courseId, onSuccess)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
