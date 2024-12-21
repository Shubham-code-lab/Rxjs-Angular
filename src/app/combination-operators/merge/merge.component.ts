import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, combineLatest, concat, forkJoin, merge, mergeMap, tap } from 'rxjs';
import { RootService } from 'src/app/service/root.service';

@Component({
  selector: 'app-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.scss']
})
export class MergeComponent implements OnInit, OnDestroy{

  private subscription$: Subscription = new Subscription(); 

  constructor(private rootService:RootService){}

  ngOnInit(): void {
    // merge will return api response in FIFO so for each observerable emit value it will emit for that goes untill subscribtion,later for any new value emit by any obervable it will only emit for that and not value for all

    const merge$ = merge(
      this.rootService.apiResponseWithDelay(6),
      this.rootService.apiResponseWithDelay(3),
      this.rootService.apiResponseWithDelay(10),
      this.rootService.apiResponseWithDelay(9),
      this.rootService.subject$,
      this.rootService.behaviourSubject$,
      this.rootService.apiResponseWithDelay(1),
      this.rootService.apiResponseWithDelay(4)
    )
    .pipe(
      tap((res) => {
        console.log('tap 1', res);
      }),
      mergeMap((res) => {
        //for each observalbe reaches here it return new observable of what ever you have in return statement for each so it can be same also as returing same stuff again and again
        console.log('mergemap', res);
        return this.rootService.apiResponseWithDelay(2);
      }),
      tap((res) => {
        console.log('tap 2', res);
      })
    )
    .subscribe({
        next: (data) => {
          console.log('data log', data);
        },
        error: (error)=>{
          console.error(error)
        },
        complete: ()=>{
          console.log("Complete")    //complete when all the observable completed
        },
      }
    );

    this.subscription$.add(merge$);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}

