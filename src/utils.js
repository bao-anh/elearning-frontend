export function shuffle(list) {
    return list.sort((a, b) => {
        let num = Math.floor(Math.random() * 101);
        if (num % 3 === 0) {
            return -1;
        }
        if (num % 3 === 1) {
            return 1;
        }
        return 0;
    })
}

export function checkLoadedReceiveProps(prevProps, nextProps) {
    return (prevProps.loading === true && nextProps.loading === false && nextProps.data);
}

export function isObjEmpty(obj) {
    if(!obj){
        console.error("isObjEmpty obj null", obj);
        return true;
    }
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export function isLoading(data) {
    if(data.loading === true || isObjEmpty(data.data)){
        return true;
    }
    return false;
}

export function isLoadingNew(data) {
    if(data.loading === true || !data.data){
        return true;
    }
    return false;
}

export function getAppId() {
    return getIdParams('appId');
}

export function getIdParams(key) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    let idStr = urlSearchParams.get(key);
    // console.log("getIdParams key", key, idStr);
    try {
        return parseInt(idStr);
    } catch(e){}
    return -1;
}

export function replaceItem(list, paramName, newItem) {
    if(!list){
        console.error('List Item null ', list);
    }
    if(!newItem){
        console.error('New Item null ', newItem);
    }
    if(!paramName){
        console.error('ParamName null ', paramName);
    }
    // console.log("replace item ", newItem, 'paramName ', paramName, 'list ', Object.assign({}, list));
    let index = list.findIndex((item) => item[paramName] === newItem[paramName]);
    if(index > -1){
        list[index] = newItem;
    } else {
        list.push(newItem);
    }
    // console.log("replaced item ", newItem, 'paramName ', paramName, 'list ', Object.assign({}, list));
}

export function formatDate(date, showTime, showSecond) {
	if(!(date instanceof Date)){
		date = new Date(date);
	}
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	
	var timeString = (day < 10 ? "0" + day : day) + '/' + (month < 10 ? "0" + month : month) + '/' + year;
	if(!!showTime){
		var h = date.getHours();
		var m = date.getMinutes();
		var s = date.getSeconds();
		return (h<10?"0"+h:h)+":"+(m<10?"0"+m : m)+(typeof showSecond === 'undefined' || showSecond === true ? (":"+(s<10?"0"+s:s)):'')+" "+timeString;
	}
	return timeString;
}

const SPECIAL_CHARACTERS = {"À":0,"Á":1,"Â":2,"Ã":3,"È":4,"É":5,"Ê":6,"Ì":7,"Í":8,"Ò":9,"Ó":10,"Ô":11,"Õ":12,"Ù":13,"Ú":14,"Ý":15,"à":16,"á":17,"â":18,"ã":19,"è":20,"é":21,"ê":22,"ì":23,"í":24,"ò":25,"ó":26,"ô":27,"õ":28,"ù":29,"ú":30,"ý":31,"Ă":32,"ă":33,"Đ":34,"đ":35,"Ĩ":36,"ĩ":37,"Ũ":38,"ũ":39,"Ơ":40,"ơ":41,"Ư":42,"ư":43,"Ạ":44,"ạ":45,"Ả":46,"ả":47,"Ấ":48,"ấ":49,"Ầ":50,"ầ":51,"Ẩ":52,"ẩ":53,"Ẫ":54,"ẫ":55,"Ậ":56,"ậ":57,"Ắ":58,"ắ":59,"Ằ":60,"ằ":61,"Ẳ":62,"ẳ":63,"Ẵ":64,"ẵ":65,"Ặ":66,"ặ":67,"Ẹ":68,"ẹ":69,"Ẻ":70,"ẻ":71,"Ẽ":72,"ẽ":73,"Ế":74,"ế":75,"Ề":76,"ề":77,"Ể":78,"ể":79,"Ễ":80,"ễ":81,"Ệ":82,"ệ":83,"Ỉ":84,"ỉ":85,"Ị":86,"ị":87,"Ọ":88,"ọ":89,"Ỏ":90,"ỏ":91,"Ố":92,"ố":93,"Ồ":94,"ồ":95,"Ổ":96,"ổ":97,"Ỗ":98,"ỗ":99,"Ộ":100,"ộ":101,"Ớ":102,"ớ":103,"Ờ":104,"ờ":105,"Ở":106,"ở":107,"Ỡ":108,"ỡ":109,"Ợ":110,"ợ":111,"Ụ":112,"ụ":113,"Ủ":114,"ủ":115,"Ứ":116,"ứ":117,"Ừ":118,"ừ":119,"Ử":120,"ử":121,"Ữ":122,"ữ":123,"Ự":124,"ự":125,"Ỹ":126,"Ỳ":127};
const REPLACEMENTS = ["A","A","A","A","E","E","E","I","I","O","O","O","O","U","U","Y","a","a","a","a","e","e","e","i","i","o","o","o","o","u","u","y","A","a","D","d","I","i","U","u","O","o","U","u","A","a","A","a","A","a","A","a","A","a","A","a","A","a","A","a","A","a","A","a","A","a","A","a","E","e","E","e","E","e","E","e","E","e","E","e","E","e","E","e","I","i","I","i","O","o","O","o","O","o","O","o","O","o","O","o","O","o","O","o","O","o","O","o","O","o","O","o","U","u","U","u","U","u","U","u","U","u","U","u","U","u","Y","Y"];	
export function stringReplaceUrl(str, regexReplace) {
	var result = '';
	for(var i = 0; i < str.length; i++){
		var c = str.charAt(i);
		if(SPECIAL_CHARACTERS[c]){
			c = REPLACEMENTS[SPECIAL_CHARACTERS[c]];
		}
		result += c;
	}
	return result.replace(/[^a-zA-Z0-9_-]/g,regexReplace ? regexReplace : '-').replace(/-{2,}/g, '-').replace(/--/g, '-').toLowerCase();
}

export function convertSecondToMinute (time) {
    return `${Math.floor(time/60)}m${time%60}s`
} 

export function getIdByPathName(pathname) {
    const pathArr = pathname.split('-');
    const id = pathArr[pathArr.length-1];
    return parseInt(id);
}

export function sortArrayByPropertyValue(arr, property) {
    const compare = ((a,b) => (
        (a[property] > b[property]) ? 1 : (a[property] < b[property]) ? -1 : 0
    ));
    return arr.sort(compare);
}