import { Category } from '@/core/entities/category'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Slug } from '@/core/entities/value-objects/slug'

export interface SQLiteCategory {
   id: string
   name: string
   display_name: string
   color: string
   icon_key: string
   description?: string
}

export class CategoryMapper {
   static toDomain(raw: SQLiteCategory): Category {
      return Category.create(
         {
            name: Slug.create(raw.name),
            iconKey: raw.icon_key,
            color: raw.color,
            displayName: raw.display_name,
            description: raw.description,
         },
         new UniqueEntityID(raw.id),
      )
   }
   static toSQLite(category: Category): SQLiteCategory {
      return {
         id: category.id.toString(),
         name: category.name.value,
         display_name: category.displayName,
         color: category.color,
         icon_key: category.iconKey,
         description: category.description,
      }
   }
}
