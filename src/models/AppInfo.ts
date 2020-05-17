
interface AppInfoEntity {
    id: number;
    appName: string;
    title: string;
    description: string;
    content: string;
    keywords: string;
    avatar: string;
    urlAndroid: string;
    urlIos: string;
    iconAndroid: string;
    iconIos: string;
    hasState: boolean;
    bucket: string;
    appNameId: string;
}
class AppInfo implements AppInfoEntity {
    public id: number;
    public appName: string;
    public title: string;
    public description: string;
    public content: string;
    public keywords: string;
    public avatar: string;
    public urlAndroid: string;
    public urlIos: string;
    public iconAndroid: string;
    public iconIos: string;
    public hasState: boolean;
    public bucket: string;
    public appNameId: string;

    constructor(props: AppInfoEntity) {
        let { id, appName, title, description, content, 
            keywords, avatar, urlAndroid, urlIos, iconAndroid, 
            iconIos, hasState, bucket, appNameId } = props;
        this.id = id ?? -1;
        this.appName = appName ?? '';
        this.title = title ?? '';
        this.description = description ?? '';
        this.content = content ?? '';
        this.keywords = keywords ?? '';
        this.avatar = avatar ?? '';
        this.urlAndroid = urlAndroid ?? '';
        this.urlIos = urlIos ?? '';
        this.iconAndroid = iconAndroid ?? '';
        this.iconIos = iconIos ?? '';
        this.hasState = hasState ?? false;
        this.bucket = bucket ?? '';
        this.appNameId = appNameId ?? '';
    }

    public static fromJS(appInfo: AppInfoEntity | string | Object): AppInfo {
        if (typeof appInfo === 'string') {
            return new AppInfo(JSON.parse(appInfo));
        } else {
            let obj = Object.create(AppInfo.prototype);
            return new AppInfo(Object.assign(obj, appInfo));
        }
    }
}

export default AppInfo;