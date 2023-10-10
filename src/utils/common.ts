
import { deteletAllCookie } from './cookie';

export const checkFocus = (pathName: string, path: string): boolean => {
  if (pathName === path) {
    return true;
  }

  return false;
};

export const daysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};
export const generateArrayOfYears = (quant?: number) => {
  var max = new Date().getFullYear();
  var min = max - (quant || 10);
  var years = [];

  for (var i = max; i >= min; i--) {
    years.push(i);
  }
  return years;
};

export const isValidDate = (d: any) => {
  return d instanceof Date; //&& !isNaN(d)
};

export const formatNumCurrency = (value: string) => {
  if (value.length === 0) return '0';

  const v = value.replace(/\./g, '');
  const result = parseFloat(v)
    .toFixed(0)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  if (result === 'NaN') {
    return '0';
  } else return result;
};

export const convertTimeToMinutes = (time: string) => {
  try {
    if (!time) return;
    const [hour, minute] = time.split(':'); //, second

    return parseInt(hour) * 60 + parseInt(minute);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCoords = (elem: any) => {
  // crossbrowser version
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
};

const filterSameArray = (arr: any) => {
  var newArr: any = [];
  newArr = arr.filter((item: any) => {
    return newArr.includes(item.subjectid) ? '' : newArr.push(item.subjectid);
  });
  return newArr;
};

//listSubjects => backend send
// index=> position of subject
// arrSort => listSubjects sorted with subjectid

const filterSubjects = (listSubjects: any, index: number, arrSort: any) => {
  const arrFiltered = filterSameArray(arrSort);
  var arrInit: any = [];
  listSubjects.forEach((item: any) => {
    if (item.subjectid === arrFiltered[index]?.subjectid) {
      arrInit.push(item);
    }
    return arrInit;
  });
  return arrInit;
};

const arrCode = ['10HK1', '10HK2', '11HK1', '11HK2', '12HK1', '12HK2'];

const finalArr = (listSubjects: any, arrSort: any) => {
  var result = [];
  const arrFiltered = filterSameArray(arrSort);
  if (arrFiltered.length === 3) {
    const arrSubject1 = filterSubjects(listSubjects, 0, arrSort);
    const arrSubject2 = filterSubjects(listSubjects, 1, arrSort);
    const arrSubject3 = filterSubjects(listSubjects, 2, arrSort);

    /// casse 1
    var newArr1 = [...arrSubject1];
    for (let i = 0; i < arrCode.length; i++) {
      if (newArr1.findIndex(ele => ele.code === arrCode[i]) === -1) {
        let newObj = {
          code: arrCode[i],
          subjectid: newArr1[0].subjectid,
          subjectname: newArr1[0].subjectname,
          point: '0',
          gradelevelid: newArr1[0].gradelevelid,
          gradelevelname: newArr1[0].gradelevelname,
        };
        newArr1.push(newObj);
      }
    }

    const newArr1Sort = [...newArr1];
    const arr1Sorted = newArr1Sort.sort((a, b) => {
      if (a.code < b.code) {
        return -1;
      }
      if (a.code > b.code) {
        return 1;
      }
      return 0;
    });
    //case 2
    var newArr2 = [...arrSubject2];
    for (let i = 0; i < arrCode.length; i++) {
      if (newArr2.findIndex(ele => ele.code === arrCode[i]) === -1) {
        let newObj = {
          code: arrCode[i],
          subjectid: newArr2[0].subjectid,
          subjectname: newArr2[0].subjectname,
          point: '0',
          gradelevelid: newArr2[0].gradelevelid,
          gradelevelname: newArr2[0].gradelevelname,
        };
        newArr2.push(newObj);
      }
    }

    const newArr2Sort = [...newArr2];
    const arr2Sorted = newArr2Sort.sort((a, b) => {
      if (a.code < b.code) {
        return -1;
      }
      if (a.code > b.code) {
        return 1;
      }
      return 0;
    });

    //case 3
    var newArr3 = [...arrSubject3];
    for (let i = 0; i < arrCode.length; i++) {
      if (newArr3.findIndex(ele => ele.code === arrCode[i]) === -1) {
        let newObj = {
          code: arrCode[i],
          subjectid: newArr3[0].subjectid,
          subjectname: newArr3[0].subjectname,
          point: '0',
          gradelevelid: newArr3[0].gradelevelid,
          gradelevelname: newArr3[0].gradelevelname,
        };
        newArr3.push(newObj);
      }
    }

    const newArr3Sort = [...newArr3];
    const arr3Sorted = newArr3Sort.sort((a, b) => {
      if (a.code < b.code) {
        return -1;
      }
      if (a.code > b.code) {
        return 1;
      }
      return 0;
    });
    result = arr1Sorted.concat(arr2Sorted, arr3Sorted);
  }
  return result;
};

export const combineObjectFromPoint = (arrayPoint: Array<any>) => {
  if (arrayPoint.length === 0) {
    return;
  } else {
    const arrSort = [...arrayPoint];
    var newarrr = arrSort.sort(function (a, b) {
      return a.subjectid - b.subjectid;
    });
    const newArrFinal: any = finalArr(arrayPoint, newarrr);

    const currentSubject = newArrFinal.length / 6;
    var newArr = [];
    for (let i = 0; i < currentSubject; i++) {
      var flagPoint = [];
      for (let j = i * 6; j < (i + 1) * 6; j++) {
        flagPoint.push(newArrFinal[j].point);
      }
      let flagObj = { ...newArrFinal[i * 6], point: flagPoint };
      newArr.push(flagObj);
    }
    return newArr;
  }
};

// https://gist.github.com/hu2di/e80d99051529dbaa7252922baafd40e3
export function removeVietnameseTones(str: string) {
  let s;
  s = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  s = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  s = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  s = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  s = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  s = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  s = str.replace(/đ/g, 'd');
  s = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  s = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  s = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  s = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  s = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  s = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  s = str.replace(/Đ/g, 'D');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  s = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  s = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  s = str.replace(/ + /g, ' ');
  s = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  s = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ');
  return s;
}

export const detectPhoneEmail = (input: string) => {
  let regNumber = /^[0-9]+$/;
  return input.match(regNumber) ? 'PHONE' : 'EMAIL';
};

export const censorValidateInfo = (info: string) => {
  return info.replace(/(.{2})(.*)(?=@)/, function (gp1, gp2, gp3) {
    let _gp2 = gp2;
    for (let i = 0; i < gp3.length; i++) {
      _gp2 += '*';
    }
    return _gp2;
  });
};

export const convertStringToArrayText = (value?: string) => {
  if (!value) return;
  const arrString = value?.split(';');
  return arrString;
};

export const checkIsExistConnectedSchool = (listSchool: Array<any>) => {
  let isExist = false;
  for (let k = 0; k < listSchool.length; k++) {
    if (listSchool[k]?.orderview < 969696) {
      isExist = true;
      break;
    } else continue;
  }
  return isExist;
};
// Dừng video
export const pauseVideo = () => {
  const videoTags = document.getElementsByTagName('video');
  if (videoTags && videoTags.length) {
    for (let i = 0; i < videoTags.length; i++) {
      videoTags[i].pause();
    }
  }
};

export const isGmail = (email: string) => {
  const emailDomain = email.substring(email.lastIndexOf('@') + 1);
  if (emailDomain === 'gmail.com') return true;
  return false;
};

export const openNewTab = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const converseArrayGetFinalTextToString = (arr: any) => {
  let finalText = '';
  if (arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]) {
        if (i !== arr.length - 1) {
          finalText += Object.values(arr[i]).pop() + ', ';
        } else {
          finalText += Object.values(arr[i]).pop() + '.';
        }
      }
    }
  }
  return finalText.slice(0, -1);
};

export const converseArrayToString = (arr: IPostTeachingFroms[]) => {
  let finalText = '';
  if (arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]) {
        if (i !== arr.length - 1) {
          finalText += arr[i].Title + ', ';
        } else {
          finalText += arr[i].Title + '.';
        }
      }
    }
  }
  return finalText.slice(0, -1);
};

export const totalNumberOfSessionsPerWeek = (postsessionweeks: IPostSessiOnWeeks[]) => {
  let countSessionsPerWeek = 0;
  postsessionweeks?.map(item => {
    if (item && item?.SessionDays && item?.SessionDays?.length > 0) {
      countSessionsPerWeek += item.SessionDays.length;
    }
  });
  return countSessionsPerWeek;
};

export const convertSessionListToString = (
  sessionList: {
    SessionDayId: number;
    SessionDayText: string;
  }[] | undefined,
) => {
  if(sessionList) {
    let res = '';
    for (let i = 0; i < sessionList.length; i++) {
      if (i !== sessionList.length - 1) res += sessionList[i].SessionDayText + ', ';
      if (i === sessionList.length - 1) {
        res += sessionList[i].SessionDayText;
      }
    }
    return res;
  }
  return '';
};

export const isFileImage = (file: File) => {
  const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
  return file && acceptedImageTypes.includes(file['type']);
};
