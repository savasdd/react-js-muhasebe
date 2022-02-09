import {merge} from "immutable";

export function handleInput(e, fieldName, ref, stateValue, callBack) {

  var mergeObj = {};
  Object.assign(mergeObj, ref.state[stateValue]);

  console.log(fieldName);

  let newVal;

  if (fieldName && fieldName.length > 0) {

    newVal = e.value;

    if (e.target == undefined) {
      if (e.value == undefined || e.value == '') {
        newVal = undefined;
      }
      mergeObj[fieldName] = newVal;
    } else {
      newVal = e.target.value;

      if (e.target.value == undefined || e.target.value == '') {
        newVal = undefined;
      }
      mergeObj[fieldName] = newVal;
    }

    var staterObj = {};
    staterObj[stateValue] = mergeObj;
    ref.setState(staterObj);
  } else {

    let newVal;

    if (e.value) {
      newVal = e.value;
    }
    if (e.target != undefined && e.target.value != undefined) {
      newVal = e.target.value;
    }

    if (e.target == undefined) {
      if (e.value == undefined || e.value == '') {
        newVal = undefined;
      }
    } else {
      newVal = e.target.value;

      if (e.target.value == undefined || e.target.value == '') {
        newVal = undefined;
      }
    }

    let temp = {};
    temp[stateValue] = newVal;

    ref.setState(temp)
  }

  if (callBack) callBack(mergeObj);
}

export function handleCheckox(e, fieldName, ref, stateValue, callBack) {
  var mergeObj = {};
  Object.assign(mergeObj, ref.state[stateValue]);

  console.log(fieldName);

  let newVal;

  if (fieldName && fieldName.length > 0) {

    newVal = e.value;

    if (e.target == undefined) {
      if (e.value == undefined || e.value == '') {
        newVal = undefined;
      }
      mergeObj[fieldName] = newVal;
    } else {
      newVal = e.target.value;

      if (e.target.value == undefined || e.target.value == '') {
        newVal = undefined;
      }
      mergeObj[fieldName] = newVal;
      mergeObj[fieldName] = e.checked;
    }

    var staterObj = {};
    staterObj[stateValue] = mergeObj;
    ref.setState(staterObj);
  } else {

    let newVal;

    if (e.value) {
      newVal = e.value;
    }
    if (e.target != undefined && e.target.value != undefined) {
      newVal = e.target.value;
    }

    if (e.target == undefined) {
      if (e.value == undefined || e.value == '') {
        newVal = undefined;
      }
    } else {
      newVal = e.target.value;

      if (e.target.value == undefined || e.target.value == '') {
        newVal = undefined;
      }
    }

    let temp = {};
    temp[stateValue] = newVal;
    temp[stateValue] = e.checked;

    ref.setState(temp)
  }

  if (callBack) callBack(mergeObj);
}

export function handleshortDate(element) {

  if (element) {
    var tempDate = new Date(element)
    element = tempDate.toLocaleDateString('Tr-tr')
  }
  return element
}
