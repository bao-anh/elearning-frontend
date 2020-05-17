interface AuthEntity {
  isAuthenticated: boolean;
  userId: string;
}

export default class Auth implements AuthEntity {
  public isAuthenticated: boolean;
  public userId: string;

  constructor(props: AuthEntity) {
    let { isAuthenticated, userId } = props;
    this.isAuthenticated = isAuthenticated ? isAuthenticated : false;
    this.userId = userId ? userId : '';
  }
}
