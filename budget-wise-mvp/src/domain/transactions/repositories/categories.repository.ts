import { Category } from '../entities/category'

export interface CategoriesRepository {
   findById(id: string): Promise<Category | null>
   findAll(): Promise<Category[]>
}
