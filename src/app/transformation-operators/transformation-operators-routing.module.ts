import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransformationOperatorsComponent } from './transformation-operators/transformation-operators.component';
import { BufferComponent } from './buffer/buffer.component';

const routes: Routes = [
  {
    path:'', 
    component:TransformationOperatorsComponent,
    children:[
      {path:'buffer', component:BufferComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransformationOperatorsRoutingModule { }
