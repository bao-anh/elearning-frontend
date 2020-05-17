interface CategoryEntity {
  id: number;
  userId: string;
  childrenIds: Array<number>;
  documentIds: Array<number>;
  name: string;
  pathName: string;
}

export default class Category implements CategoryEntity {
  public id: number;
  public userId: string;
  public childrenIds: Array<number>;
  public documentIds: Array<number>;
  public name: string;
  public pathName: string;

  constructor(props: CategoryEntity) {
    let { id, userId, childrenIds, documentIds, name, pathName } = props;
    this.id = id ? id : -1;
    this.userId = userId ? userId : '';
    this.childrenIds = childrenIds ? childrenIds : [];
    this.documentIds = documentIds ? documentIds : [];
    this.name = name ? name : '';
    this.pathName = pathName ? pathName : '';
  }
}
