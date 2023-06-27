import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component'
import { RecipeStartComponent } from './recipe-start/recipe-start.component'
import { RecipeBookComponent } from './recipe-book.component'
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component'
import { RecipeListComponent } from './recipe-list/recipe-list.component'
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component'
import { RecipeRoutingModule } from './recipe-book-routing.module'
import { SharedModule } from '../shared/shared.module'
@NgModule({
  declarations: [
    RecipeBookComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports:[
    ReactiveFormsModule,RouterModule,RecipeRoutingModule,SharedModule
  ],
  exports:[
    // RecipeBookComponent,
    // RecipeListComponent,
    // RecipeDetailComponent,
    // RecipeItemComponent,
    // RecipeStartComponent,
    // RecipeEditComponent

  ]
})
export class RecipeBookModule {}
