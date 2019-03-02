class Search {
  static searchInArray(s, arr, key) {
    var returnArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (this.isInString(s, arr[i][key])) {
        returnArr.push(arr[i]);
      }
    }
    return returnArr
  }
  static isInString(s, str) {
    str = str.replace(/\s*/g, ""); // remove spaces
    var arr = str.split(""); // string 2 array
    if (this.isInArray(s, arr)) {
      return true;
    } else {
      return false;
    }
  }
  static isInArray(e, arr) {
    if (arr.indexOf(e) > -1) {
      return true;
    }
    return false;
  }
}

export default Search;
