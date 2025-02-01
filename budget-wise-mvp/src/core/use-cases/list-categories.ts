import { Either, right } from '../either'

import { Category } from '../entities/category'
import { CategoriesRepository } from '../repositories/categories.repository'

type ListCategoriesUseCaseResponse = Either<null, { categories: Category[] }>

export class ListCategoriesUseCase {
   constructor(private categoriesRepository: CategoriesRepository) {}

   async execute(): Promise<ListCategoriesUseCaseResponse> {
      const categories = await this.categoriesRepository.findAll()

      return right({ categories })
   }
}
