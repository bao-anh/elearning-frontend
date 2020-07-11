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

export function shuffleArray(arr) {
  const newArr = [...arr];
  return newArr.sort(() => Math.random() - 0.5);
}

export function randomMultipleElementLeftOfArray(arr, element, number) {
  const arrayShuffled = shuffleArray([...arr]);
  const index = arrayShuffled.findIndex((ele) => ele.name === element.name);
  arrayShuffled.splice(index, 1);
  return arrayShuffled.slice(0, number);
}

export function mergeElementOfArray(arr, property) {
  let newArray = [];
  arr.forEach((element) => {
    newArray = [...newArray, ...element[property]];
  });
  return newArray;
}

export function getSetIdFromURL(url) {
  const urlArray = url.split('/');
  return urlArray[urlArray.length - 1];
}

export function checkifArrayContainElementWithSpecificProperty(
  arr,
  property,
  value
) {
  return arr.some((element) => element[property] === value);
}

export function isPermittedToEdit(auth, set) {
  if (auth._id === set.ownerId._id) return true;
  else {
    if (auth.setIds.includes(set._id) && set.editable) return true;
    else return false;
  }
}

export function isPermittedToAccess(auth, set) {
  if (auth._id === set.ownerId._id) return true;
  else {
    if (auth.setIds.includes(set._id) && set.visiable) return true;
    else return false;
  }
}

export function filterAccessableSet(auth, set) {
  return set.filter((item) => {
    if (auth._id === item.ownerId._id) return true;
    else if (auth.setIds.includes(item._id) && item.visiable) return true;
    else return false;
  });
}

export function handleRedirectWhenServerError(err, routes) {
  if (err.response.status === 401) {
    if (window.location.href !== routes.UNAUTHORIZED_SCREEN)
      window.location.href = routes.UNAUTHORIZED_SCREEN;
  } else if (err.response.status === 422) {
    if (window.location.href !== routes.UNPROCESSABLE_ENTITY_SCREEN)
      window.location.href = routes.UNPROCESSABLE_ENTITY_SCREEN;
  } else if (err.response.status === 500) {
    if (window.location.href !== routes.SERVER_ERROR_SCREEN)
      window.location.href = routes.SERVER_ERROR_SCREEN;
  } else {
    if (window.location.href !== routes.REQUEST_TIMEOUT_SCREEN)
      window.location.href = routes.REQUEST_TIMEOUT_SCREEN;
  }
}

export function handleExtractErrorMessage(response) {
  const { data, statusText } = response;
  let message = '';
  if (data) {
    if (data.errors) {
      data.errors.forEach((error) => {
        message += `${error.msg}. `;
      });
    } else message += data.msg;
  } else {
    message = statusText;
  }
  return message;
}

export function orderIndexOfComment(commentIds, element, parent) {
  let count = 0;
  if (parent) {
    const index = commentIds.indexOf(parent);
    for (let i = 0; i < index; i++) {
      count += 1 + commentIds[i].childrenIds.length;
    }
    count += 2 + commentIds[index].childrenIds.indexOf(element);
  } else {
    const index = commentIds.indexOf(element);
    for (let i = 0; i < index; i++) {
      count += 1 + commentIds[i].childrenIds.length;
    }
    count++;
  }
  return count;
}

export function likeComment(state, action, position) {
  if (action.isLike) {
    if (action.parent) {
      const newCommentIds = [...state[position].commentIds];
      const parentIndex = newCommentIds.indexOf(action.parent);
      const childrenIndex = newCommentIds[parentIndex].childrenIds.indexOf(
        action.item
      );
      newCommentIds[parentIndex].childrenIds[childrenIndex].likeIds = [
        ...newCommentIds[parentIndex].childrenIds[childrenIndex].likeIds,
        action.userId,
      ];
      return {
        ...state,
        largeTopic: {
          ...state.largeTopic,
          commentIds: newCommentIds,
        },
      };
    } else {
      const newCommentIds = [...state[position].commentIds];
      const index = newCommentIds.indexOf(action.item);
      newCommentIds[index].likeIds = [
        ...newCommentIds[index].likeIds,
        action.userId,
      ];
      return {
        ...state,
        largeTopic: {
          ...state.largeTopic,
          commentIds: newCommentIds,
        },
      };
    }
  } else {
    if (action.parent) {
      const newCommentIds = [...state[position].commentIds];
      const parentIndex = newCommentIds.indexOf(action.parent);
      const childrenIndex = newCommentIds[parentIndex].childrenIds.indexOf(
        action.item
      );

      const newLikeIds = newCommentIds[parentIndex].childrenIds[
        childrenIndex
      ].likeIds.filter((likeId) => likeId !== action.userId);

      newCommentIds[parentIndex].childrenIds[childrenIndex].likeIds = [
        ...newLikeIds,
      ];

      return {
        ...state,
        largeTopic: {
          ...state.largeTopic,
          commentIds: newCommentIds,
        },
      };
    } else {
      const newCommentIds = [...state[position].commentIds];
      const index = newCommentIds.indexOf(action.item);

      const newLikeIds = newCommentIds[index].likeIds.filter(
        (likeId) => likeId !== action.userId
      );

      newCommentIds[index].likeIds = [...newLikeIds];
      return {
        ...state,
        largeTopic: {
          ...state.largeTopic,
          commentIds: newCommentIds,
        },
      };
    }
  }
}
