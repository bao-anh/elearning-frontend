class Routes {
  static HOME_SCREEN = '/';
  static ABOUT_SCREEN = '/about';
  static COURSE_SCREEN = '/course/:id';
  static TOPIC_SCREEN = '/topic/:id';
  static LESSON_SCREEN = '/lesson/:id';
  static ASSIGNMENT_SCREEN = '/assignment/:id';
  static CATEGORY_SCREEN = '/category/:id';
  static UTILITY_SCREEN = '/utility/:id';
  static SIGNIN_SCREEN = '/signin';
  static REGISTER_SCREEN = '/register';
  static TOEIC_SCREEN = '/toeic';
  static TEST_SCREEN = '/test/:part';
  static REVIEW_SCREEN = '/review/:id';
  static FLASHCARD_SCREEN = '/flashcard';
  static SET_SCREEN = '/set/:id';
  static WRITE_SET_SCREEN = '/set/:id/write';
  static STUDY_SET_SCREEN = '/set/:id/study';
  static LISTEN_SET_SCREEN = '/set/:id/listen';
  static EDIT_SET_SCREEN = '/set/:id/edit';
  static UNAUTHORIZED_SCREEN = '/401';
  static UNPROCESSABLE_ENTITY_SCREEN = '/422';
  static SERVER_ERROR_SCREEN = '/500';
  static REQUEST_TIMEOUT_SCREEN = '/408';
}
export default Routes;
