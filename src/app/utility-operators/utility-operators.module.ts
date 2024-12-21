import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilityOperatorsRoutingModule } from './utility-operators-routing.module';
import { UtilityOperatorsComponent } from './utility-operators/utility-operators.component';


@NgModule({
  declarations: [
    UtilityOperatorsComponent
  ],
  imports: [
    CommonModule,
    UtilityOperatorsRoutingModule
  ]
})
export class UtilityOperatorsModule { }
