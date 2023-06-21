import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon');
export async function createTable() {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            'create table if not exists menuitems (id INTEGER PRIMARY KEY AUTOINCREMENT,name text , description text, price text, category text, image text);'
          );
        },
        reject,
        resolve
      );
    });
  }


export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menuitems', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}



export function saveMenuItems(menuItems) {
  db.transaction((tx) => {
    const placeholders = menuItems.map(() => '(?, ?, ?, ?, ?)').join(', ');
    const values = menuItems.flatMap((item) => [
      item.name,
      item.price,
      item.description,
      item.category,
      item.image
    ]);

    const query = `INSERT INTO menuitems (name, price, description, category, image) VALUES ${placeholders}`;

    tx.executeSql(
      query,
      values,
      (_, { rowsAffected }) => {
        console.log(`Inserted ${rowsAffected} menu items`);
      },
      (_, error) => {
        console.log(`Error inserting menu items: ${error.message}`);
      }
    );
  });
}

  

export async function filterByQueryAndCategories(query, activeCategories) {

  return new Promise((resolve, reject) => {
    const columns = ['name', 'price', 'description', 'image'];
const columnString = columns.join(', ');
    if (!query) {
      db.transaction((tx) => {
        
        tx.executeSql(
          `select * from menuitems where ${activeCategories
            .map((category) => `category='${category}'`)
            .join(' or ')}`,
          [],
          (_, { rows }) => {
            resolve(rows._array);
          }
        );
      }, reject);
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          `select * from menuitems where (name like '%${query}%') and (${activeCategories
            .map((category) => `category='${category}'`)
            .join(' or ')})`,
          [],
          (_, { rows }) => {
            resolve(rows._array);
          }
        );
      }, reject);
    }
  },
  );
 
}
