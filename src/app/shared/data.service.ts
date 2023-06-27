import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Recipe } from '../recipe-book/recipe.model'
import { RecipeService } from '../recipe-book/recipe.service'
import { map, tap,take,exhaustMap } from 'rxjs'
import { AuthService } from '../auth/auth.service'
@Injectable({ providedIn: 'root' })
export class DataService {
  constructor (private http: HttpClient, private recipeServ: RecipeService,private auth:AuthService) {}
  storeRecipe () {
    const recipes = this.recipeServ.getRecipes()
    this.http
      .put(
        'https://recipe-book-project-udem-ad2cc-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(response)
      })
  }
  fetchRecipe () {
   
      return this.http
      .get<Recipe[]>(
        'https://recipe-book-project-udem-ad2cc-default-rtdb.firebaseio.com/recipes.json'
      ).pipe(map(recipes => {
      return recipes.map(recipes => {
        return {
          ...recipes,
          ingredients: recipes.ingredients ? recipes.ingredients : []
        }
      })
    }),tap(recipes=>{

        this.recipeServ.setRecipes(recipes)
    })   
   )
      
      
      
     
  }
}
