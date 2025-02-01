import { Category } from '@/core/entities/category'
import { CategoriesRepository } from '@/core/repositories/categories.repository'

import { Database } from '../database'
import { CategoryMapper, SQLiteCategory } from '../mappers/category.mapper'

export class SQLiteCategoriesRepository implements CategoriesRepository {
   public readonly tableName = 'categories'

   constructor(private db: Database) {}

   async findAll(): Promise<Category[]> {
      try {
         const categories = await this.db.conn.getAllAsync<SQLiteCategory>(
            `SELECT * FROM ${this.tableName}`,
         )

         return categories.map(CategoryMapper.toDomain)
      } catch (error) {
         throw error
      }
   }

   async findById(id: string): Promise<Category | null> {
      const category = await this.db.conn.getFirstAsync<SQLiteCategory>(
         `SELECT * FROM ${this.tableName} WHERE id = ?`,
         [id],
      )

      if (!category) {
         return null
      }

      return CategoryMapper.toDomain(category)
   }
}
