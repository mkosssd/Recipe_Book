import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { ShoppingListComponent } from './shopping-list.component'
import { ListEditComponent } from './list-edit/list-edit.component'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [ShoppingListComponent, ListEditComponent],
  imports: [FormsModule, RouterModule, RouterModule.forChild([
    { path: '', component: ShoppingListComponent }

  ]),SharedModule], 
  
})
export class ShoppingListModule {}
