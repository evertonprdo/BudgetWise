import * as SQLite from 'expo-sqlite'

export class Database {
   get conn() {
      return this.db
   }

   private constructor(private db: SQLite.SQLiteDatabase) {}

   static async create() {
      try {
         const connection = await SQLite.openDatabaseAsync('budget-wise')
         await connection.execAsync(`
            PRAGMA journal_mode = WAL;
            PRAGMA foreign_keys = ON;
         `)
         return new Database(connection)
      } catch (error) {
         throw error
      }
   }

   async createTablesIfNotExist() {
      try {
         await this.db.execAsync(`
            CREATE TABLE IF NOT EXISTS categories (
               id TEXT PRIMARY KEY,
               name TEXT NOT NULL,
               display_name TEXT NOT NULL,
               color TEXT NOT NULL,
               icon_key TEXT NOT NULL,
               description TEXT
            );
            CREATE TABLE IF NOT EXISTS transactions (
               id TEXT PRIMARY KEY,
               type TEXT NOT NULL,
               cents INTEGER NOT NULL,
               date INTEGER NOT NULL,
               description TEXT NOT NULL,
               category_id TEXT NOT NULL,
               created_at INTEGER NOT NULL,
               updated_at INTEGER,
               FOREIGN KEY (category_id) REFERENCES categories(id)
            );
         `)

         await this.seedCategoriesIfNotExist()
      } catch (error) {
         throw error
      }
   }

   // Initial Categories
   private async seedCategoriesIfNotExist() {
      try {
         const result = await this.db.getAllAsync<{ count: number }>(
            'SELECT COUNT(*) as count FROM categories',
         )
         const count = result[0]?.count || 0

         if (count > 0) {
            return
         }

         await this.db.execAsync(`
            INSERT INTO categories (id, name, display_name, color, icon_key) VALUES
            ('c824a3e0-e471-4a24-9ae6-49a9176c66ef', 'grocery-shopping', 'Grocery Shopping', '#ad46ff', 'building-store'),
            ('1cbd07af-dd03-4c10-9483-e203a42143a6', 'recurring', 'Recurring', '#00bc7d', 'refresh'),
            ('ff3e5e20-6fcc-4034-8d07-a72955126a8e', 'one-time', 'One-Time', '#2b7fff', 'receipt'),
            ('2c23de87-f6b9-400d-b511-08d1d486a68c', 'utility-bills', 'Utility Bills', '#fe9a00', 'bulb'),
            ('bb584b9a-755b-4b11-b11d-c83cacab0a2d', 'miscellaneous', 'Miscellaneous', '#62748e', 'puzzle');
         `)
      } catch (error) {
         console.log(error)
         throw error
      }
   }

   close() {
      this.db.closeAsync()
   }
}
