export const convertObject = (arrayConvert: any) => {
  const newArray = arrayConvert.map((item: any) => {
    return { id: item.id, text: item.title };
  });
  return newArray;
};

export const checkIndexOption = (array: Array<any>, index: number) => {
  if (array?.length > 0) {
    const indexFound = array.findIndex((a: any) => a.id === index);
    return indexFound;
  } else return -1;
};

export const filterArrayByObjectValue = (value: any, arrFilter: any) => {
  if (value === 0) {
    return arrFilter;
  } else {
    const newArr = arrFilter.filter((item: any) => {
      return item.provinceid === value;
    });
    return newArr;
  }
};

export const filterFileUpload = (arr: any) => {
  if (arr.length <= 0) {
    return arr;
  } else {
    const newArr = arr.filter((item: any) => {
      return typeof item?.lastModified === 'number';
    });
    return newArr;
  }
};

export const filterFileUploaded = (arr: any) => {
  if (arr.length <= 0) {
    return arr;
  } else {
    const newArr = arr.filter((item: any) => {
      return typeof item?.lastModified !== 'number';
    });
    return newArr;
  }
};
