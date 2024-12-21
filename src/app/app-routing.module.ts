import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'combination-operators', pathMatch: 'full'},
  { 
    path: 'combination-operators', 
    loadChildren:() => import('./combination-operators/combination-operators.module').then(m=>m.CombinationOperatorsModule),
  },
  { 
    path: 'filtering-operators', 
    loadChildren: () => import('./filtering-operators/filtering-operators.module').then(m => m.FilteringOperatorsModule),
  },
  { 
    path: 'transformation-operators', 
    loadChildren: () => import('./transformation-operators/transformation-operators.module').then(m => m.TransformationOperatorsModule),
  },
  { 
    path: 'utility-operators', 
    loadChildren: () => import('./utility-operators/utility-operators.module').then(m => m.UtilityOperatorsModule),
  },
  { path: '**', redirectTo: 'combination-operators', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }