import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilityOperatorsComponent } from './utility-operators/utility-operators.component';

const routes: Routes = [
  {path:'', component:UtilityOperatorsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilityOperatorsRoutingModule { }
