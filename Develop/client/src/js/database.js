import { openDB } from 'idb';
// import { text } from 'express';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Put to the database');
  // Create connection to database + desired version.
  const textDb = await openDB('jate', 1);
  // Create new transaction and specify database and data privileges.
  const tx = textDb.transaction('jate', 'readwrite');
  // Open desired object store.
  const store = tx.objectStore('jate');
  // Use .add() method on store and passin content.
  const request = store.put({ text: content });
  // Get confirmation of request
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');
  // Create connection to database and desired version.
  const todosDb = await openDB('jate', 1);
  // Create new transaction and specify the database and data privileges.
  const tx = todosDb.transaction('jate', 'readonly');
  // Open up desired object store.
  const store = tx.objectStore('jate');
  // Use .getAll() method to get all data in database.
  const request = store.getAll();
   // Get confirmation of request.
  const result = await request;
  console.log('result.value', result);
  //return result.value;
}

initdb();
