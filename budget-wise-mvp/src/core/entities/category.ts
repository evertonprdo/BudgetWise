import { Entity } from './entity'
import { UniqueEntityID } from './unique-entity-id'
import { Optional } from '../types/optional'

import { Slug } from './value-objects/slug'

export interface CategoryProps {
   name: Slug
   displayName: string
   color: string
   iconKey: string
   description?: string
}

export class Category extends Entity<CategoryProps> {
   get name() {
      return this.props.name
   }

   get displayName() {
      return this.props.displayName
   }

   get color() {
      return this.props.color
   }

   get iconKey() {
      return this.props.iconKey
   }

   get description() {
      return this.props.description
   }

   static create(props: Optional<CategoryProps, 'name'>, id?: UniqueEntityID) {
      return new Category(
         {
            ...props,
            name: props.name ?? Slug.createFromText(props.displayName),
         },
         id,
      )
   }
}
