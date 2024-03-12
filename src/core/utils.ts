export default class Utils {
  static genRandomColor() {
    return Math.floor(Math.random() * 16777215).toString(16);
  }
  static stringToColor(str: string): string {
    var hash = 0;
    if (str.length === 0) return "";
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash;
    }
    var color = "#";
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 255;
      color += ("00" + value.toString(16)).substr(-2);
    }
    return color;
  }

  static findDuplicate(array: string[]) {
    const uniqueElements = new Set();
    const duplicates: string[] = [];

    array.forEach((item) => {
      if (uniqueElements.has(item)) {
        duplicates.push(item);
      } else {
        uniqueElements.add(item);
      }
    });
    return duplicates;
  }
}
