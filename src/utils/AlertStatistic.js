class alertStatistic {
  static getAlertCount(e) {
    return e.alertState[0];
  }

  static getAlertRate(e, type) {
    var certainAlertCount = 0;
    var alertCount = e.alertState[0];

    var alertStateArr = e.alertState;
    certainAlertCount = alertStateArr[type];

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
