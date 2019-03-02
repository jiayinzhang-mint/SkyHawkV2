class Search {
  static searchInArray(s, arr, key) {
    var returnArr = [];
    if (s) {
      // won't search if searchbox is empty
      for (let i = 0; i < arr.length; i++) {
        if (this.isInString(s, arr[i][key])) {
          returnArr.push(arr[i]);
        }
      }
    }
    return returnArr;
  }
  static isInString(s, str) {
    str = str.replace(/\s*/g, ""); // remove spaces
    if (str.indexOf(s) > -1) {
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
