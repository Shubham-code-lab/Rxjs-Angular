import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CombinationOperatorsRoutingModule } from './combination-operators-routing.module';
import { CombinationOperatorsComponent } from './combination-operators/combination-operators.component';
import { CombineLatestComponent } from './combine-latest/combine-latest.component';
import { ForkJoinComponent } from './fork-join/fork-join.component';
import { ConcatComponent } from './concat/concat.component';
import { ZipComponent } from './zip/zip.component';
import { MergeComponent } from './merge/merge.component';


@NgModule({
  declarations: [
    CombinationOperatorsComponent,
    CombineLatestComponent,
    ForkJoinComponent,
    ConcatComponent,
    ZipComponent,
    MergeComponent
  ],
  imports: [
    CommonModule,
    CombinationOperatorsRoutingModule
  ]
})
export class CombinationOperatorsModule { }
