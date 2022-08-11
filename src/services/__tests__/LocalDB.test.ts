import LocalDB from '../LocalDB';

describe('LocalDB', () => {
  describe('saveItem', () => {
    it('should store a new item on the localStorage', () => {
      const key = 'bogus';
      const value = 'even-more-bogus';

      LocalDB.saveItem(key, value);

      expect(localStorage.getItem(key)).toBe(value);

      const arrValue = [1, 2, 3];
      const numValue = 3;
      const obj = { haha: 'ohoho' };

      LocalDB.saveItem(key, arrValue);
      expect(localStorage.getItem(key)).toBe(JSON.stringify(arrValue));
      
      LocalDB.saveItem(key, numValue);
      expect(localStorage.getItem(key)).toBe(String(numValue));
      
      LocalDB.saveItem(key, obj);
      expect(localStorage.getItem(key)).toBe(JSON.stringify(obj));
    });
  });

  describe('retrieveString', () => {
    const keyOne = 'my-str-key';
    const valueOne = '123';
    const keyTwo = 'my-other-str-key';
    const valueTwo = [1, 2, 3];

    LocalDB.saveItem(keyOne, valueOne);
    LocalDB.saveItem(keyTwo, valueTwo);

    it('Should retrieve a item as string from the database', () => {
      const retrievedOne = LocalDB.retrieveString(keyOne);
      expect(retrievedOne).toBe(valueOne);

      const retrievedTwo = LocalDB.retrieveString(keyTwo);
      expect(retrievedTwo).toBe(JSON.stringify(valueTwo));
    });
  });
});

