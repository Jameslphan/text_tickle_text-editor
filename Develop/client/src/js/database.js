import { openDB } from 'idb';

const initdb = async () =>
  openDB('ttte', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('ttte')) {
        console.log('ttte database already exists');
        return;
      }
      db.createObjectStore('ttte', { keyPath: 'id', autoIncrement: true });
      console.log('ttte database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to database');
  // Create connection to database + desired version.
  const ttteDb = await openDB('ttte', 1);
  // Create new transaction and specify database and data privileges.
  const tx = ttteDb.transaction('ttte', 'readwrite');
  // Open desired object store.
  const store = tx.objectStore('ttte');
  // Use .add() method on store and passin content.
  const request = store.add({ ttte: content });
  // Get confirmation of request
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');
  // Create connection to database and desired version.
  const ttteDb = await openDB('ttte', 1);
  // Create new transaction and specify the database and data privileges.
  const tx = ttteDb.transaction('ttte', 'readonly');
  // Open up desired object store.
  const store = tx.objectStore('ttte');
  // Use .getAll() method to get all data in database.
  const request = store.getAll();
   // Get confirmation of request.
  const result = await request;
  console.log('result.value', result);
  return result;
;}
initdb();
