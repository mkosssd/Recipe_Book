import {NgModule} from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RecipeBookComponent } from './recipe-book.component'
import { RecipeStartComponent } from './recipe-start/recipe-start.component'
import { RecipeDetailComponent } from './/recipe-detail/recipe-detail.component'
import { RecipeEditComponent } from './/recipe-edit/recipe-edit.component'
import { RecipeResolverrService } from './/recipe-resolverr.service'
import { AuthGuard } from '../auth/auth.guard'
const routes:Routes = [
    {
        path: '',    
        component: RecipeBookComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', component: RecipeStartComponent },
          { path: 'new', component: RecipeEditComponent },
          {
            path: ':id',
            component: RecipeDetailComponent,
            resolve: [RecipeResolverrService]
          },
          {
            path: ':id/edit',
            component: RecipeEditComponent,
            resolve: [RecipeResolverrService]
          }
        ]
      }
]
@NgModule({
    
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class RecipeRoutingModule{}