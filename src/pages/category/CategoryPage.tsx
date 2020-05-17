import React, { useEffect, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import * as categoryAction from '../../redux/actions/category';
import * as courseAction from '../../redux/actions/course';
import queryString from 'query-string';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { MainWidget, FixedContainer } from '../../components/Widgets';
import '../../resources/scss/about.scss';
import '../../resources/scss/main.scss';

const CategoryPage: FunctionComponent<{
  fetchAllCategory: Function;
  fetchCourseByCategoryId: Function;
  location: any;
}> = ({ fetchAllCategory, fetchCourseByCategoryId, location }) => {
  useEffect(() => {
    if (location.search) {
      const parsed = queryString.parse(location.search);
      if (parsed.categoryId) fetchCourseByCategoryId(parsed.categoryId);
    }
    fetchAllCategory();
    //eslint-disable-next-line
  }, []);

  return (
    <MainWidget className={'about-page'}>
      <Header />
      <FixedContainer>
        <h1>That is category page</h1>
      </FixedContainer>
      <Footer />
    </MainWidget>
  );
};

const mapStateToProps = (state: AppState, ownProps: any) => {
  return {
    categoryState: state.categoryState,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllCategory: () => dispatch(categoryAction.fetchCategory()),
  fetchCourseByCategoryId: (categoryId: number) =>
    dispatch(courseAction.fetchCourseByCategoryId(categoryId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
