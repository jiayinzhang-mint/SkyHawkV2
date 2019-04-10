class alertStatistic {
  static getAlertCount(e) {
    var alertCount = 0;
    // alert type won't include err & unprocessed alert
    var alertTypeArr = e.alertType;
    for (let i = 0; i < alertTypeArr.length; i++) {
      alertCount += alertTypeArr[i];
    }
    return alertCount;
  }

  static getAlertRate(e, type) {
    var certainAlertCount = 0;
    var alertCount = 0;

    var alertStateArr = e.alertState;
    certainAlertCount = alertStateArr[type];

    var alertTypeArr = e.alertType;
    for (let i = 0; i < alertTypeArr.length; i++) {
      alertCount += alertTypeArr[i];
    }
    return (certainAlertCount / (alertCount + 1)).toFixed(2);
  }

  static getAlertTrend(organizationStatistic, type) {
    var alertTrendArr = [];
    for (let i = 0; i < organizationStatistic.length; i++) {
      console.log(this.getAlertRate(organizationStatistic[i], type));
      // * 100 because vuetify only support int
      if (type) {
        alertTrendArr.unshift(
          100 * this.getAlertRate(organizationStatistic[i], type)
        );
      } else {
        alertTrendArr.unshift(this.getAlertCount(organizationStatistic[i]));
      }
    }
    return alertTrendArr;
  }
}
export default alertStatistic;
