export default class Utils {

  static utils = new Utils();

  public formatDuration(n: any): string {
    const seconds = n.seconds();
    const minutes = n.minutes();
    let res = '';
    if (minutes > 0) {
      res = minutes + 'm';
    }
    if (seconds > 0) {
      res += ' ' + seconds + 's';
    }

    return res.trim();;
  }
}

