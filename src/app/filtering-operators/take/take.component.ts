import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval, of, take, takeLast, takeUntil, takeWhile, tap } from 'rxjs';
import { RootService } from 'src/app/service/root.service';

@Component({
  selector: 'app-take',
  templateUrl: './take.component.html',
  styleUrls: ['./take.component.scss']
})

export class TakeComponent implements OnInit, OnDestroy{

  private subscription:Subscription = new Subscription();

  constructor(private rootService:RootService){}

  ngOnInit(): void {

  }

  take(){
    const take$ = interval(1000)
    .pipe(
      tap((res) => {
        console.log('tap 1', res);
      }),
      take(3),    //if source only emit 2 value then it will be completed when source is completed
      tap((res) => {
        console.log('tap 2', res);
      }),
    )
    .subscribe({
      next: (data) => {
        console.log('subscribe Data log ', data);
      },
      error: (error)=>{
        console.error(error)
      },
      complete: ()=>{
        console.log("Complete")    //complete when all the observable completed
      },
    });

    this.subscription.add(take$);
  }

  takeLast(){
    const take$ = 
    // interval(1000)   //source observable never complete so it never emit
    // of(5,2)    //less then 3 so it will only emit 2 value as this source observable is complete
    of(2,5,7,3,8,2,6,4)  //only emit last 3 values 2,6,4
    .pipe(
      tap((res) => {
        console.log('tap 1', res);
      }),
      takeLast(3),    //wait for source observable to complete and when it complete emit last 3 value  //if source observable never complete then it never emit  //if source emit less then 3 and complete then it will only emit those value
      tap((res) => {
        console.log('tap 2', res);
      }),
    )
    .subscribe({
      next: (data) => {
        console.log('subscribe Data log ', data);
      },
      error: (error)=>{
        console.error(error)
      },
      complete: ()=>{
        console.log("Complete")    //complete when all the observable completed
      },
    });

    this.subscription.add(take$);
  }

  takeUntil(){
    const takeUntil$ =
    interval(1000)
    .pipe(
      tap((res) => {
        console.log('tap 1', res);
      }),
      takeUntil(this.rootService.subject$),   //until the provided observable doesn't emit i.e :-subject, this will continue to emit (mirror source observable) and it will be completed if that observable emit
      tap((res) => {
        console.log('tap 2', res);
      }),
    )
    .subscribe({
      next: (data) => {
        console.log('subscribe Data log ', data);
      },
      error: (error)=>{
        console.error(error)
      },
      complete: ()=>{
        console.log("Complete")    //complete when all the observable completed
      },
    });

    this.subscription.add(takeUntil$);
  }

  takeWhile(){
    const takeWhile$ =
    interval(1000)
    .pipe(
      tap((res) => {
        console.log('tap 1', res);
      }),
      takeWhile((value)=>value < 5, true),   //value should satisfies the condition in predicate function then it emit the source observable(mirror source observable)  //second parameter is optional that only say include last emit or not it emit 5 if true if false it will emit until 4
      tap((res) => {
        console.log('tap 2', res);
      }),
    )
    .subscribe({
      next: (data) => {
        console.log('subscribe Data log ', data);
      },
      error: (error)=>{
        console.error(error)
      },
      complete: ()=>{
        console.log("Complete")    //complete when all the observable completed
      },
    });

    this.subscription.add(takeWhile$);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}