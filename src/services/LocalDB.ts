/**
 * LocalDB is a wrapper for storing and retrieving local data.
 * It uses the browser's localStorage API as storage
 */
abstract class LocalDB {
  /**
   * Stores a new item on the local database
   * 
   * @param  {string} key Identifier for the saved item
   * @param  {unknown} value Value to be stored
   */
  public static saveItem(key: string, value: unknown) {
    switch (typeof value) {
      case 'object':
        localStorage.setItem(key, JSON.stringify(value));
        break;
      case 'string':
        localStorage.setItem(key, value);
        break;
      default:
        localStorage.setItem(key, String(value));
    }
  }

  /**
   * Retrieves a stored string from the local database
   * 
   * @param  {string} key Identifier for the saved item
   * @returns string
   */
  public static retrieveString(key: string): string {
    const storedValue = localStorage.getItem(key);

    if (!storedValue || storedValue.trim() === '') {
      return '';
    }
    
    return storedValue;
  }

  /**
   * Retrieves a stored list from the local database
   * 
   * @param  {string} key Identifier for the saved item
   * @returns Array
   */
  public static retrieveList<T>(key: string): Array<T> {
    const value = JSON.parse(this.retrieveString(key));

    if (Array.isArray(value)) {
      return value;
    }
    
    return [];
  }
}

export default LocalDB;
