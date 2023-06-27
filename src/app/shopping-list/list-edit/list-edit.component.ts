import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core'
import { Subscription } from 'rxjs'
import { Ingredient } from '../../shared/ingredient.model'
import { ShoppingListService } from '../shooping-list.service'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shopForm:NgForm
  subs: Subscription
  editMode = false
  editedItemIndex: number
  editedItem:Ingredient
  constructor (private shopServ: ShoppingListService) {}
  ngOnInit (): void {
    this.subs = this.shopServ.startedEditing.subscribe((index: number) => {
      this.editedItemIndex = index
      this.editMode = true
      this.editedItem = this.shopServ.getIngredient(index)
      this.shopForm.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount
      })
    })
  }
  onDelete(form:NgForm){
    this.shopServ.deleteIng(this.editedItemIndex)
    
    this.onClear()
  }
  onSubmit (form: NgForm) {
    const value = form.value
    const newInd = new Ingredient(value.name, value.amount)
    // this.shopServ.addIngredient(newInd);
    if(this.editMode){
      this.shopServ.updateIng(this.editedItemIndex,newInd)
    }else{
      this.shopServ.addIngredient(newInd)
    }
    // console.log(form)
    form.reset()
    this.editMode = false

  }
  ngOnDestroy (): void {
    this.subs.unsubscribe()
  }
  onClear(){
    this.shopForm.reset()
    this.editMode = false
  }
}
