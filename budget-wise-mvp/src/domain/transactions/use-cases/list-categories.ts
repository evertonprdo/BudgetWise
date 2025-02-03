import { Either, right } from '@/domain/core/either'

import { CategoriesRepository } from '../repositories/categories.repository'
import { Category } from '../entities/category'

type ListCategoriesUseCaseResponse = Either<null, { categories: Category[] }>

export class ListCategoriesUseCase {
   constructor(private categoriesRepository: CategoriesRepository) {}

   async execute(): Promise<ListCategoriesUseCaseResponse> {
      const categories = await this.categoriesRepository.findAll()

      return right({ categories })
   }
}
