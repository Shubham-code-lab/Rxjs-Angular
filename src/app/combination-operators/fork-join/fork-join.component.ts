import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, combineLatest, concat, forkJoin, mergeMap, tap } from 'rxjs';
import { RootService } from 'src/app/service/root.service';

@Component({
  selector: 'app-fork-join',
  templateUrl: './fork-join.component.html',
  styleUrls: ['./fork-join.component.scss']
})
export class ForkJoinComponent implements OnInit, OnDestroy{

  private subscription$: Subscription = new Subscription(); 

  constructor(private rootService:RootService){}

  ngOnInit(): void {
    // forkJoin take array of obseravle will wait untill all them are complete then it emit later if no one emit as they are already completed

    const forkJoin$ =  forkJoin([
        this.rootService.apiResponseWithDelay(6),
        this.rootService.apiResponseWithDelay(3),
        this.rootService.apiResponseWithDelay(10),
        this.rootService.apiResponseWithDelay(9),
        this.rootService.subject$,
        this.rootService.behaviourSubject$,
        this.rootService.apiResponseWithDelay(1),
        this.rootService.apiResponseWithDelay(4)
    ])
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

    this.subscription$.add(forkJoin$);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}


