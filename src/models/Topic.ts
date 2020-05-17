interface TopicEntity {
  id: number;
  courseId: number;
  parentId: number;
  type: number;
  userName: string;
  path: Array<number>;
  childrenIds: Array<number>;
  documentIds?: Array<number>;
}

export default class Topic implements TopicEntity {
  public id: number;
  public courseId: number;
  public parentId: number;
  public type: number;
  public userName: string;
  public path: Array<number>;
  public childrenIds: Array<number>;
  public documentIds?: Array<number>;

  constructor(props: TopicEntity) {
    let {
      id,
      courseId,
      parentId,
      type,
      userName,
      path,
      childrenIds,
      documentIds
    } = props;
    this.id = id ? id : -1;
    this.courseId = courseId ? courseId : -1;
    this.parentId = parentId ? parentId : -1;
    this.type = type ? type : 1;
    this.userName = userName ? userName : '';
    this.path = path ? path : [];
    this.childrenIds = childrenIds ? childrenIds : [];
    this.documentIds = documentIds ? documentIds : [];
  }
}
