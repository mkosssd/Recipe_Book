import {Injectable} from '@angular/core'
import {Subject} from 'rxjs'
import { Recipe } from './recipe.model'
import { Ingredient } from '../shared/ingredient.model'
import {ShoppingListService} from '../shopping-list/shooping-list.service'

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>()
  // recipeSelected = new Subject<Recipe>()
  //  private recipes: Recipe[] = [
  //   new Recipe(
  //     'SAMOSA',
  //     'A samosa or singara is a fried South Asian pastry with a savoury filling, including ingredients such as spiced potatoes, onions, and peas. It may take different forms, including triangular, cone, or half-moon shapes, depending on the region.',
  //     'https://static.toiimg.com/thumb/61050397.cms?imgsize=246859&width=800&height=800',
  //     [new Ingredient('Potato',2),
  //      new Ingredient('Maida',1)]
  //   ),
  //   new Recipe(
  //     'KACHORI',
  //     'Kachori is a sweet and spicy deep-fried snack, originating in India subcontinent, and common in places with Indian diaspora and other South Asian diaspora. Alternative names for the snack include kachauri, kachodi and katchuri.',
  //     'https://c.ndtvimg.com/2022-06/toj0lktg_aloo-puri_625x300_16_June_22.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=675',
  //     [new Ingredient('Dal',1),
  //   new Ingredient('Maida',2)]
  //   ),
  //   new Recipe(
  //     'DAL PAKWAAN',
  //     'In Indian cuisine, dal are dried, split pulses that do not require soaking before cooking. India is the largest producer of pulses in the world. The term is also used for various soups prepared from these pulses. ',
  //     'http://sindhirasoi.com/wp-content/uploads/2008/10/dalpakwan1.jpg',
  //     [new Ingredient('Dal',1),
  //     new Ingredient('Maida',2)]
  //   ),
  //   new Recipe(
  //     'CHOLE BHATURE',
  //     'Chole bhature is a food dish popular in the Northern areas of the Indian subcontinent. It is a combination of chana masala and bhatura/puri, a deep-fried bread made from maida. Chole bhature is often eaten as a breakfast dish, sometimes accompanied with lassi',
  //     'https://upload.wikimedia.org/wikipedia/commons/9/9e/Chole_Bhature_from_Nagpur.JPG',
  //     [new Ingredient('Chole',1),
  //   new Ingredient('Maida',2)]
  //   )
  // ]
  private recipes:Recipe[]=[]
  constructor(private shopServ:ShoppingListService){ }
  getRecipes () {
    return this.recipes.slice()
  }
  setRecipes(recipe:Recipe[]){
    this.recipes = recipe
    this.recipesChanged.next(this.recipes.slice())
  }
  getRecipe(index:number){
    return this.recipes[index]

  }
  addIngToShopList(ingredients:Ingredient[]){
    this.shopServ.addIngredients(ingredients)
  }
  addRecipe(recipe:Recipe){
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice())
  }
  updateRecipe(index:number,newRecipe:Recipe){
    this.recipes[index] = newRecipe
    this.recipesChanged.next(this.recipes.slice())

  }
  deleteRecipe(index:number){
    this.recipes.splice(index,1)
    this.recipesChanged.next(this.recipes.slice())
  }
 
}
