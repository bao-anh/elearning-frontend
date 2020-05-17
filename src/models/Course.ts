interface CourseEntity {
  id: number;
  memberNum: number;
  cost: number;
  shortDescription: string;
  bannerLink: string;
  name: string;
  avatar: string;
  timeExpire: number;
  lessionIds: Array<number>;
  documentIds?: Array<number>;
}

class Course implements CourseEntity {
  public id: number;
  public memberNum: number;
  public cost: number;
  public shortDescription: string;
  public bannerLink: string;
  public name: string;
  public avatar: string;
  public timeExpire: number;
  public lessionIds: Array<number>;
  public documentIds?: Array<number>;

  constructor(props: CourseEntity) {
    let {
      id,
      memberNum,
      cost,
      shortDescription,
      bannerLink,
      name,
      avatar,
      timeExpire,
      lessionIds,
      documentIds,
    } = props;
    this.id = id ? id : -1;
    this.memberNum = memberNum ? memberNum : 0;
    this.cost = cost ? cost : 0;
    this.shortDescription = shortDescription ? shortDescription : '';
    this.bannerLink = bannerLink ? bannerLink : '';
    this.name = name ? name : '';
    this.avatar = avatar ? avatar : '';
    this.timeExpire = timeExpire ? timeExpire : 180;
    this.lessionIds = lessionIds ? lessionIds : [];
    this.documentIds = documentIds ? documentIds : [];
  }
}

export default Course;
