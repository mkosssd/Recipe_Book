import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Recipe } from '../recipe.model'
import { RecipeService } from '../recipe.service'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe

  id: number
  constructor (
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit () {
    this.route.params.subscribe((parmas: Params) => {
      this.id = +parmas['id']
      this.recipe = this.recipeService.getRecipe(this.id)
    })
  }

  onAddToShoppingList () {
    this.recipeService.addIngToShopList(this.recipe.ingredients)
  }
  
  onEdit () {
    this.router.navigate(['edit'], { relativeTo: this.route })
  }
  delete(){
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(['/recipes'],{relativeTo:this.route})
  }
}
