export function formatDate(dateStr){
    let date = new Date(dateStr);
    var year = date.getFullYear();
    var month = date.getMonth() + 1; //月份显示0~11，需要加1
    //如果显示的时间是小于10的，只显示一位数，为了让显示的时间更加规范，添加一个判断条件
    month = month < 10 ? "0" + month : month;
    var day = date.getDate();
    day = day < 10 ? "0" + day : day;
    var hour = date.getHours();
    hour = hour < 10 ? "0" + hour : hour;
    var minute = date.getMinutes();
    minute = minute < 10 ? "0" + minute : minute;
    var second = date.getSeconds();
    second = second < 10 ? "0" + second : second;
    var dateTime =
      year +
      "/" +
      month +
      "/" +
      day +
      " " +
      hour +
      ":" +
      minute +
      ":" +
      second;
    return dateTime;
}

export function formatYMD(dateStr){
    let date = new Date(dateStr);
    var year = date.getFullYear();
    var month = date.getMonth() + 1; //月份显示0~11，需要加1
    //如果显示的时间是小于10的，只显示一位数，为了让显示的时间更加规范，添加一个判断条件
    month = month < 10 ? "0" + month : month;
    var day = date.getDate();
    day = day < 10 ? "0" + day : day;
    var hour = date.getHours();
    hour = hour < 10 ? "0" + hour : hour;
    var minute = date.getMinutes();
    minute = minute < 10 ? "0" + minute : minute;
    var second = date.getSeconds();
    second = second < 10 ? "0" + second : second;
    var dateTime =
      year +
      "/" +
      month +
      "/" +
      day;
    return dateTime;
}