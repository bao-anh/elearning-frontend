class Config {
  static TEST_MODE = true;

  static USER_ID = 'kienxxx';

  static SECRET_KEY = 'koolsoft-web';
  static BASE_URL = `https://webappapi-dot-micro-enigma-235001.appspot.com`;
  static ELEARNING_URL = 'https://api-dot-ielts-fighters.appspot.com/api';
  static NULL_STRING = '';

  static API_GET_CARDS_BY_IDS = '/get-card-by-ids';
  static API_GET_CARDS_FOR_TEST_SETTING = '/data?type=get_cards_for_test';

  static HTTP_REQUEST_TIMEOUT = 30000;
  static HTTP_REQUEST_SUCCESSS = 200;
  static HTTP_REQUEST_ERROR = 500;
}
export default Config;
