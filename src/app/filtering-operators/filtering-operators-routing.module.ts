import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilteringOperatorsComponent } from './filtering-operators/filtering-operators.component';
import { TakeComponent } from './take/take.component';
import { SkipComponent } from './skip/skip.component';
import { DistinctComponent } from './distinct/distinct.component';

const routes: Routes = [
  {
    path:'',
    component:FilteringOperatorsComponent,
    children:[
      {path:'take', component:TakeComponent},
      {path:'skip', component:SkipComponent},
      {path:'distinct', component:DistinctComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilteringOperatorsRoutingModule { }
