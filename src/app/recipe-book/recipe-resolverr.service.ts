import { Injectable } from '@angular/core';
import { Resolve,ActivatedRouteSnapshot,RouterStateSnapshot  } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataService } from '../shared/data.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverrService implements Resolve<Recipe[]> {

  constructor(private data:DataService,private recipeService:RecipeService) { }
  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    const recipes = this.recipeService.getRecipes()
    if(recipes.length===0){

      return this.data.fetchRecipe()
    }else{
      return recipes
    }
  }
}
