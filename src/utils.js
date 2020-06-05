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

export function convertRadioChartData(arr) {
  let part5 = 0;
  let data = [];
  arr.forEach((element, index) => {
    if (index !== 4 && index !== 5) {
      const newElement = {
        subject: `Part ${element.partNumber}`,
        A: element.progressIds[0].percentComplete,
        fullMark: 100,
      };
      data.push(newElement);
    } else if (index === 4) {
      part5 = element.progressIds[0].percentComplete;
    } else {
      const newElement = {
        subject: 'Part 5 - 6',
        A: Math.round((part5 + element.progressIds[0].percentComplete) / 2),
        fullMark: 100,
      };
      data.push(newElement);
    }
  });
  return data;
}

export function convertBarChartData(arr, property) {
  let dateArray = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const newDate = `${date.getDate()}/${date.getMonth() + 1}`;
    dateArray.push(newDate);
  }

  const arrayFiltered = arr.filter((element) => {
    if (
      element[property] !== null &&
      element[property] !== undefined &&
      new Date().getDate() - new Date(element.date).getDate() <= 7
    ) {
      return true;
    } else return false;
  });

  let count = [0, 0, 0, 0, 0, 0, 0];

  arrayFiltered.forEach((element, index) => {
    const date = new Date(element.date);
    const countIndex = dateArray.indexOf(
      `${date.getDate()}/${date.getMonth() + 1}`
    );
    count[countIndex]++;
  });

  const result = count.map((element, index) => {
    return {
      date: dateArray[index],
      count: element,
    };
  });

  return result.reverse();
}

export function convertPieChartData(arr) {
  let countArray = [
    {
      name: 'Luôn đúng',
      subtitle: 'Bạn đã trả lời đúng rất nhiều!',
      count: 0,
      color: '#4caf50',
      termIds: [],
    },
    {
      name: 'Hay đúng',
      subtitle: 'Bạn trả lời đúng nhiều, nhưng vẫn đôi khi sai!',
      count: 0,
      color: '#8bc34a',
      termIds: [],
    },
    {
      name: 'Có lúc đúng, lúc sai',
      subtitle: 'Các đáp án của bạn đôi lúc đúng, đôi lúc sai!',
      count: 0,
      color: '#ffeb3b',
      termIds: [],
    },
    {
      name: 'Hay sai',
      subtitle: 'Bạn trả lời sai nhiều hơn đúng!',
      count: 0,
      color: '#ff9800',
      termIds: [],
    },
    {
      name: 'Luôn sai',
      subtitle: 'Bạn cần luyện tập thêm những từ vựng này',
      count: 0,
      color: '#f44336',
      termIds: [],
    },
    {
      name: 'Chưa trả lời',
      subtitle: 'Bạn chưa luyện tập những từ vựng này',
      count: 0,
      color: '#9e9e9e',
      termIds: [],
    },
  ];

  arr.forEach((element) => {
    const { attempt, correct } = element.rememberIds[0];

    if (attempt === 0) {
      countArray[5].count++;
      countArray[5].termIds.push(element);
    } else if (correct / attempt > 0.9) {
      countArray[0].count++;
      countArray[0].termIds.push(element);
    } else if (correct / attempt > 0.6) {
      countArray[1].count++;
      countArray[1].termIds.push(element);
    } else if (correct / attempt > 0.4) {
      countArray[2].count++;
      countArray[2].termIds.push(element);
    } else if (correct / attempt > 0.2) {
      countArray[3].count++;
      countArray[3].termIds.push(element);
    } else {
      countArray[4].count++;
      countArray[4].termIds.push(element);
    }
  });

  return countArray;
}
