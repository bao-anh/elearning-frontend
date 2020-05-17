interface ReferenceEntity {
  id: number;
  userId: string;
  url: string;
  title: string;
  description: string;
  pathName: string;
}

export default class Reference implements ReferenceEntity {
  public id: number;
  public userId: string;
  public url: string;
  public title: string;
  public description: string;
  public pathName: string;

  constructor(props: ReferenceEntity) {
    let { id, userId, url, title, description, pathName } = props;
    this.id = id ? id : -1;
    this.userId = userId ? userId : '';
    this.url = url ? url : '';
    this.title = title ? title : '';
    this.description = description ? description : '';
    this.pathName = pathName ? pathName : '';
  }
}
