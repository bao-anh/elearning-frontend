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

export function getQuestionOrder(arr) {
  const questionOrderArray = [];
  // Phải cho tham số này vào
  let isSingleQuestionPrevious = false;
  arr.forEach((element, index) => {
    if (element.childrenIds && element.childrenIds.length) {
      if (index === 0) questionOrderArray.push(element.childrenIds.length);
      else if (isSingleQuestionPrevious) {
        questionOrderArray.push(
          element.childrenIds.length + questionOrderArray[index - 1] + 1
        );
        isSingleQuestionPrevious = false;
      } else {
        isSingleQuestionPrevious = false;
        questionOrderArray.push(
          element.childrenIds.length + questionOrderArray[index - 1]
        );
      }
    } else {
      if (index === 0) questionOrderArray.push(0);
      else if (isSingleQuestionPrevious === false) {
        questionOrderArray.push(questionOrderArray[index - 1]);
      } else questionOrderArray.push(questionOrderArray[index - 1] + 1);
      isSingleQuestionPrevious = true;
    }
  });
  return questionOrderArray;
}

export function renderNumberOfQuestion(arr) {
  let count = 0;
  arr.forEach((element) => {
    if (element.childrenIds && element.childrenIds.length)
      count += element.childrenIds.length;
    else count += 1;
  });
  return count;
}
