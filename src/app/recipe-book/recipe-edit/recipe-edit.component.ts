import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms'
import {RecipeService} from '../recipe.service'

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{
  id:number
  editMode=false
  recipeForm:FormGroup
  constructor(private route:ActivatedRoute,private recipeServ:RecipeService,private router:Router){}
  ngOnInit(){
    this.route.params.subscribe(
      (params:Params)=>{
        this.id= +params['id']
        this.editMode = params['id'] != null;
        this.initForm()
      }
      )
    }
    private initForm(){
      let recipeName=''
      let recipeImagePath=''
      let recipeDesciption=''
      let recipeIngredient=new FormArray([])
      if(this.editMode){
        const recipe = this.recipeServ.getRecipe(this.id);
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDesciption = recipe.description;
        if(recipe['ingredients']){
          for(let ingr of recipe.ingredients){
            recipeIngredient.push(
              new FormGroup({
                'name': new FormControl(ingr.name, Validators.required),
                'amount': new FormControl(ingr.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
              })
              );
            }
          }
        }
        
        this.recipeForm = new FormGroup({
          'name':new FormControl(recipeName,Validators.required),
          'imagePath':new FormControl(recipeImagePath,Validators.required),
          'description':new FormControl(recipeDesciption,Validators.required),
          'ingredients':recipeIngredient
          
        })
        
      }
      onSubmit(){
        // console.log(this.recipeForm.value)
        // const newRecipe = new Recipe(this.recipeForm.value['name'],
        // this.recipeForm.value['description'],
        // this.recipeForm.value['imagePath'],
        // this.recipeForm.value['ingredients'])
        if(this.editMode){
          this.recipeServ.updateRecipe(this.id,this.recipeForm.value)
        }else{
          this.recipeServ.addRecipe(this.recipeForm.value)
        }
        this.cancel()
      }
      onAddIngredient() { 
        (<FormArray>this.recipeForm.get('ingredients')).push(
          new FormGroup({
            'name':new FormControl(null,Validators.required),
            'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
          })
          )
        }
        // get controls() { 
        //   return (<FormArray>this.recipeForm.get('ingredients')).controls;
        // }
        get controls() {
          return (this.recipeForm.get('ingredients') as FormArray).controls
        }
        cancel(){
          this.router.navigate(['../'], {relativeTo: this.route}) 
          
        }
        deleteIngredient(index:number){
          // this.recipeServ.deleteIngredientServ(this.id,i)
          (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
        }
        clearAllIng(){
          (<FormArray>this.recipeForm.get('ingredients')).clear();

        }
       
      }
      