import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval, of, skip, skipLast, skipUntil, skipWhile, take, takeLast, takeUntil, takeWhile, tap } from 'rxjs';
import { RootService } from 'src/app/service/root.service';

@Component({
  selector: 'app-skip',
  templateUrl: './skip.component.html',
  styleUrls: ['./skip.component.scss']
})
export class SkipComponent implements OnInit, OnDestroy{

  private subscription:Subscription = new Subscription();

  constructor(private rootService:RootService){}

  ngOnInit(): void {
  }

  skip(){
    const skip$ = interval(500)
    .pipe(
      tap((res) => {
        console.log('tap 1', res);
      }),
      // take(20),   //will start from 0-20 skip will skip first 0-10 then it will take next 10 value 10-20
      skip(10),   //skip first 10 value
      take(20),   //will start counting after the skipped value so 10 + 20 it will output from 10 to 30 (total of 20) and then subscription is complete
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

    this.subscription.add(skip$);
  }

  skipLast(){
    const skipLast$ = interval(500)  //if interval is never complete skip don't know what is the last 10 value to skip so what it does is it will delay the observable to number of emit given in skip(number)
    .pipe(
      tap((res) => {
        console.log('tap 1', res);
      }),
      take(9),     //so using take to make observable complete
      skipLast(10),   //when it reaches 10 value so it can skip last 10 then it start emitting value   //if it never received value that is given to skip the observable will never emit and completed
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

    this.subscription.add(skipLast$);
  }

  skipUntil(){
    const skipLast$ = interval(500)
    .pipe(
      tap((res) => {
        console.log('tap 1', res);
      }),
      skipUntil(this.rootService.subject$),   //it will skip until the given observable i.e :- subject doesn't emit anything
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

    this.subscription.add(skipLast$);
  }



  skipWhile(){
    const skipLast$ = of(1,2,13,15,18,6,7,5)       
    .pipe(
      tap((res) => {
        console.log('tap 1', res);
      }),
      skipWhile((value) => value <= 10),   //skip while the condition is satisfied  //once condition become false it will not check this condition 
      tap((res) => {
        console.log('tap 2', res);    //output :- 13,15,18,6,7,5  //skipped value :- 1,2
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

    this.subscription.add(skipLast$);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
