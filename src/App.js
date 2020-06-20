import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import CategoryPage from './pages/category/CategoryPage';
import CoursePage from './pages/course/CoursePage';
import LessonPage from './pages/lesson/LessonPage';
import TopicPage from './pages/topic/TopicPage';
import AssignmentPage from './pages/assignment/AssignmentPage';
import SignInPage from './pages/auth/SignInPage';
import RegisterPage from './pages/auth/RegisterPage';
import UtilityPage from './pages/utility/UtilityPage';
import NotFoundPage from './pages/redirect/NotFoundPage';
import ToeicPage from './pages/toeic/ToeicPage';
import TestPage from './pages/test/TestPage';
import TestResultPage from './pages/test/TestResultPage';
import FlashcardPage from './pages/flashcard/FlashcardPage';
import WriteSetPage from './pages/flashcard/WriteSetPage';
import ListenSetPage from './pages/flashcard/ListenSetPage';
import StudySetPage from './pages/flashcard/StudySetPage';
import EditSetPage from './pages/flashcard/EditSetPage';
import SetPage from './pages/flashcard/SetPage';
import Routes from './routes';
import Layout from './components/common/Layout';
import UnAuthorizedPage from './pages/redirect/UnAuthorizedPage';
import UnprocessableEntityPage from './pages/redirect/UnprocessableEntityPage';
import ServerErrorPage from './pages/redirect/ServerErrorPage';
import RequestTimeoutPage from './pages/redirect/RequestTimeoutPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <PrivateRoute exact path={Routes.HOME_SCREEN} component={HomePage} />
          <PublicRoute
            exact
            path={Routes.SIGNIN_SCREEN}
            component={SignInPage}
          />
          <PublicRoute
            exact
            path={Routes.REGISTER_SCREEN}
            component={RegisterPage}
          />
          <PrivateRoute
            exact
            path={Routes.CATEGORY_SCREEN}
            component={CategoryPage}
          />
          <PrivateRoute
            exact
            path={Routes.COURSE_SCREEN}
            component={CoursePage}
          />
          <PrivateRoute
            exact
            path={Routes.LESSON_SCREEN}
            component={LessonPage}
          />
          <PrivateRoute
            exact
            path={Routes.TOPIC_SCREEN}
            component={TopicPage}
          />
          <PrivateRoute
            exact
            path={Routes.ASSIGNMENT_SCREEN}
            component={AssignmentPage}
          />
          <PrivateRoute
            exact
            path={Routes.UTILITY_SCREEN}
            component={UtilityPage}
          />
          <PrivateRoute
            exact
            path={Routes.TOEIC_SCREEN}
            component={ToeicPage}
          />
          <PrivateRoute
            exact
            path={Routes.REVIEW_SCREEN}
            component={TestResultPage}
          />
          <PrivateRoute
            exact
            path={Routes.FLASHCARD_SCREEN}
            component={FlashcardPage}
          />
          <PrivateRoute exact path={Routes.SET_SCREEN} component={SetPage} />
          <PrivateRoute
            exact
            path={Routes.WRITE_SET_SCREEN}
            component={WriteSetPage}
          />
          <PrivateRoute
            exact
            path={Routes.LISTEN_SET_SCREEN}
            component={ListenSetPage}
          />
          <PrivateRoute
            exact
            path={Routes.STUDY_SET_SCREEN}
            component={StudySetPage}
          />
          <PrivateRoute
            exact
            path={Routes.EDIT_SET_SCREEN}
            component={EditSetPage}
          />
          <PrivateRoute exact path={Routes.TEST_SCREEN} component={TestPage} />
          <PrivateRoute
            exact
            path={Routes.UNAUTHORIZED_SCREEN}
            component={UnAuthorizedPage}
          />
          <PrivateRoute
            exact
            path={Routes.UNPROCESSABLE_ENTITY_SCREEN}
            component={UnprocessableEntityPage}
          />
          <PrivateRoute
            exact
            path={Routes.SERVER_ERROR_SCREEN}
            component={ServerErrorPage}
          />
          <PrivateRoute
            exact
            path={Routes.REQUEST_TIMEOUT_SCREEN}
            component={RequestTimeoutPage}
          />
          <PrivateRoute path='*' component={NotFoundPage} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
