export function convertSecondToMinute(time) {
  return `${Math.floor(time / 60)}m${time % 60}s`;
}

export function getIdByPathName(pathname) {
  const pathArr = pathname.split('-');
  const id = pathArr[pathArr.length - 1];
  return parseInt(id);
}

export function sortArrayByPropertyValue(arr, property) {
  const compare = (a, b) =>
    a[property] > b[property] ? 1 : a[property] < b[property] ? -1 : 0;
  return arr.sort(compare);
}
