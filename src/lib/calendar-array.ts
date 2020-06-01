class CalendarArray {
  public trach() {
    return 12;
  }

  private send() {
    return 11;
  }
}

// export globals
if (typeof module !== "undefined") {
  module.exports = CalendarArray;
} else {
  window["CalendarArray"] = CalendarArray;
}
