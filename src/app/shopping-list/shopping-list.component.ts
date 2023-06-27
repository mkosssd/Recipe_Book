import { Component,OnInit,OnDestroy} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shooping-list.service';
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy{
  ingredient:Ingredient[]
  private igChangeSub: Subscription
  constructor(private shopServ:ShoppingListService){ }
  ngOnInit() {
    this.ingredient = this.shopServ.getIngredients()
    this.igChangeSub =this.shopServ.ingredientsChanged.subscribe((ingredients:Ingredient[])=>{
      this.ingredient  = ingredients;
    }
    )
  }
  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
  onEditItem(index:number){
    this.shopServ.startedEditing.next(index)
  }
}
