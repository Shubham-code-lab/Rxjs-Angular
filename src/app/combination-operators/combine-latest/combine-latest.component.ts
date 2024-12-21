import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, combineLatest, mergeMap, tap } from 'rxjs';
import { RootService } from 'src/app/service/root.service';

@Component({
  selector: 'app-combine-latest',
  templateUrl: './combine-latest.component.html',
  styleUrls: ['./combine-latest.component.scss']
})
export class CombineLatestComponent implements OnInit, OnDestroy{

  private subscription$: Subscription = new Subscription(); 

  constructor(private rootService:RootService){}

  ngOnInit(): void {
    // wait for all of them to execute atleast one value then emit
    //when any of one oberavable emit value (which is not complete as comleted observale don't emit) it emit again with latest value of all even if they are complete just take latest value of there.

    const combineLatest$ = combineLatest([
      this.rootService.apiResponseWithDelay(6),
      this.rootService.apiResponseWithDelay(3),
      this.rootService.apiResponseWithDelay(1),
      this.rootService.apiResponseWithDelay(4),
      this.rootService.subject$,
      this.rootService.behaviourSubject$,
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

    this.subscription$.add(combineLatest$);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}
