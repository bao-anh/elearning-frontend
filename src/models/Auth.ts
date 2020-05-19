interface AuthEntity {
  userId: string;
  email: string;
  password: string;
}

export default class Auth implements AuthEntity {
  public userId: string;
  public email: string;
  public password: string;

  constructor(props: AuthEntity) {
    let { userId, email, password } = props;
    this.userId = userId ? userId : '';
    this.email = email ? email : '';
    this.password = password ? password : '';
  }
}
