import { EventEmitter } from '@angular/core'
import { Subject } from 'rxjs'
import { Ingredient } from '../shared/ingredient.model'
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>()
  startedEditing = new Subject<number>()
  private ingredient: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomato', 6)
  ]
  getIngredients () {
    return this.ingredient.slice()
  }
  getIngredient(index:number){
    return this.ingredient[index]
  }
  updateIng(index:number,newIng:Ingredient){
    this.ingredient[index] = newIng;
    this.ingredientsChanged.next(this.ingredient.slice())
  }
  addIngredient (ingredient: Ingredient) {
    this.ingredient.push(ingredient)
    this.ingredientsChanged.next(this.ingredient.slice())
  }
  addIngredients (ingredients: Ingredient[]) {
    // for(let ingredient of ingredients){
    //   this.addIngredient(ingredient)
    // }
    this.ingredient.push(...ingredients)
    this.ingredientsChanged.next(this.ingredient.slice())
  }
  deleteIng(index:number){
    this.ingredient.splice(index,1)
    this.ingredientsChanged.next(this.ingredient.slice())
  }
}
