import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransformationOperatorsRoutingModule } from './transformation-operators-routing.module';
import { TransformationOperatorsComponent } from './transformation-operators/transformation-operators.component';
import { BufferComponent } from './buffer/buffer.component';


@NgModule({
  declarations: [
    TransformationOperatorsComponent,
    BufferComponent,
  ],
  imports: [
    CommonModule,
    TransformationOperatorsRoutingModule
  ]
})
export class TransformationOperatorsModule { }
