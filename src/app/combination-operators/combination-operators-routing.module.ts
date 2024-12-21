import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CombinationOperatorsComponent } from './combination-operators/combination-operators.component';
import { CombineLatestComponent } from './combine-latest/combine-latest.component';
import { ForkJoinComponent } from './fork-join/fork-join.component';
import { ConcatComponent } from './concat/concat.component';
import { ZipComponent } from './zip/zip.component';
import { MergeComponent } from './merge/merge.component';

const routes: Routes = [
  {
    path:'', 
    component:CombinationOperatorsComponent,
    children:[
      {path: 'merge', component:MergeComponent},
      {path: 'concat', component:ConcatComponent},
      {path: 'fork-join', component:ForkJoinComponent},
      {path: 'combine-latest', component:CombineLatestComponent},
      {path: 'zip', component:ZipComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CombinationOperatorsRoutingModule { }
