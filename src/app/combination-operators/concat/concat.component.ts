import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, combineLatest, concat, mergeMap, tap } from 'rxjs';
import { RootService } from 'src/app/service/root.service';

@Component({
  selector: 'app-concat',
  templateUrl: './concat.component.html',
  styleUrls: ['./concat.component.scss']
})
export class ConcatComponent implements OnInit, OnDestroy{

  private subscription$: Subscription = new Subscription(); 

  constructor(private rootService:RootService){}

  ngOnInit(): void {
    //it goes line by line first obserbvaleb complete it goes untill subsribtion then it does same for next observable
    //but if subject is there in middle then it won't make call to processding API even if that subject execute execute later
    //later any observable emit will act like merge only for that observale it emit unitl subsciebtion

     const concat$ =  concat(
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

    this.subscription$.add(concat$);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}

