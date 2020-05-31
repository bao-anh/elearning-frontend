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
import NotFoundPage from './pages/404/NotFoundPage';
import ToeicPage from './pages/toeic/ToeicPage';
import TestPage from './pages/test/TestPage';
import TestResultPage from './pages/test/TestResultPage';
import FlashcardPage from './pages/flashcard/FlashCardPage';
import Routes from './routes';
import Layout from './components/common/Layout';
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
          <PrivateRoute exact path={Routes.TEST_SCREEN} component={TestPage} />
          <PrivateRoute path='*' component={NotFoundPage} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
