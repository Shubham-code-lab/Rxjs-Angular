import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilteringOperatorsRoutingModule } from './filtering-operators-routing.module';
import { FilteringOperatorsComponent } from './filtering-operators/filtering-operators.component';
import { TakeComponent } from './take/take.component';
import { SkipComponent } from './skip/skip.component';
import { DistinctComponent } from './distinct/distinct.component';


@NgModule({
  declarations: [
    FilteringOperatorsComponent,
    TakeComponent,
    SkipComponent,
    DistinctComponent
  ],
  imports: [
    CommonModule,
    FilteringOperatorsRoutingModule
  ]
})
export class FilteringOperatorsModule { }
