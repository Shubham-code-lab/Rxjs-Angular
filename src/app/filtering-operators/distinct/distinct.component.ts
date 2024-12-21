import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, concatMap, delay, distinct, distinctUntilChanged, distinctUntilKeyChanged, from, interval, of, skip, skipLast, skipUntil, skipWhile, take, takeLast, takeUntil, takeWhile, tap } from 'rxjs';
import { RootService } from 'src/app/service/root.service';

@Component({
  selector: 'app-distinct',
  templateUrl: './distinct.component.html',
  styleUrls: ['./distinct.component.scss']
})
export class DistinctComponent implements OnInit, OnDestroy{

  private subscription:Subscription = new Subscription();

  constructor(private rootService:RootService){}

  ngOnInit(): void {
  }

  distinct(){
    const distinct$ = of(5, 9, 6, 4, 1, 7, 10, 10, 10, 4, 6, 3, 5, 3, 2, 8, 10, 9, 1, 2, 8, 7)
    // const distinct$ = from([    //distinct don't know if object is distinct unless we provide key to it
    //   { id: 4, name: 'David' },
    //   { id: 7, name: 'Grace' },  //
    //   { id: 10, name: 'Jack' },
    //   { id: 3, name: 'Charlie' },
    //   { id: 2, name: 'Bob' },
    //   { id: 5, name: 'Eve' },
    //   { id: 8, name: 'Hannah' },
    //   { id: 1, name: 'Alice' },
    //   { id: 9, name: 'Isaac' },  //
    //   { id: 1, name: 'Frank' },
    //   { id: 7, name: 'Grace' },  //
    //   { id: 3, name: 'Eve' },
    //   { id: 5, name: 'David' },
    //   { id: 10, name: 'Hannah' },
    //   { id: 8, name: 'Bob' },
    //   { id: 9, name: 'Isaac' },   //
    //   { id: 2, name: 'Frank' },
    //   { id: 4, name: 'Alice' },
    //   { id: 1, name: 'Jack' },
    //   { id: 6, name: 'Charlie' }
    // ])
    .pipe(
      tap((res) => {
        console.log('tap 1', res);
      }),
      concatMap((value) => of(value).pipe(delay(1000))),
      //check for distinct value in all values like set 
      distinct(undefined,this.rootService.subject$),    //will ignore duplicate //gives distinct value   //second parameter will reset the set array so i will allow again dplicate
      // distinct((value)=>value.name),
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

    this.subscription.add(distinct$);
  }

  distinctUntilChanged(){
      //  const distinct$ = of(5, 9, 6, 4, 1, 7, 3, 2, 8, 10, 9, 9, 1, 2, 8, 7, 10, 4, 6, 3, 5)    //only check if current value is distinct form previous value
       const distinct$ = from([ 
       { id: 4, name: 'David' },
       { id: 10, name: 'Jack' },
       { id: 3, name: 'Charlie' },
       { id: 2, name: 'Bob' },
       { id: 5, name: 'Eve' },
       { id: 8, name: 'Hannah' },
       { id: 1, name: 'Alice' },
       { id: 9, name: 'Isaac' },  //
       { id: 1, name: 'Frank' },
       { id: 7, name: 'Grace' },  //    
       { id: 7, name: 'Grace' },  //  this will not be emitted as previous value is same as current
       { id: 3, name: 'Eve' },
       { id: 5, name: 'David' },
       { id: 10, name: 'Hannah' },
       { id: 8, name: 'Bob' },
       { id: 9, name: 'Isaac' },   //  will be emitted as previous value is Bob and not Isaac
       { id: 2, name: 'Frank' },
       { id: 4, name: 'Alice' },
       { id: 1, name: 'Jack' },
       { id: 6, name: 'Charlie' }
     ])
     .pipe(
       tap((res) => {
         console.log('tap 1', res);
       }),
      //  distinctUntilChanged(),
       distinctUntilChanged((previousValue, currentValue)=>previousValue.name === currentValue.name),    //important emitted value will be the new previous value
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
 
     this.subscription.add(distinct$);
  }

  distinctUntilKeyChanged(){  //good for object key change
      //  const distinct$ = of(5, 9, 6, 4, 1, 7, 3, 2, 8, 10, 9, 9, 1, 2, 8, 7, 10, 4, 6, 3, 5)    //only check if current value is distinct form previous value
      const distinct$ = from([ 
        { id: 4, name: 'David' },
        { id: 10, name: 'Jack' },
        { id: 3, name: 'Charlie' },
        { id: 2, name: 'Bob' },
        { id: 5, name: 'Eve' },
        { id: 8, name: 'Hannah' },
        { id: 1, name: 'Alice' },
        { id: 9, name: 'Isaac' },  //
        { id: 1, name: 'Frank' },
        { id: 7, name: 'Grace' },  //    
        { id: 7, name: 'Grace' },  //  this will not be emitted as previous value is same as current
        { id: 3, name: 'Eve' },
        { id: 5, name: 'David' },
        { id: 10, name: 'Hannah' },
        { id: 8, name: 'Bob' },
        { id: 9, name: 'Isaac' },   //  will be emitted as previous value is Bob and not Isaac
        { id: 2, name: 'Frank' },
        { id: 4, name: 'Alice' },
        { id: 1, name: 'Jack' },
        { id: 6, name: 'Charlie' }
      ])
      .pipe(
        tap((res) => {
          console.log('tap 1', res);
        }),
        // distinctUntilKeyChanged('name'),  //only compare with previous emitted value.
        distinctUntilKeyChanged('name',(previousValue, currentValue)=>previousValue.substring(0,4) === currentValue.substring(0,4)),    //important emitted value will be the new previous value
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
  
      this.subscription.add(distinct$);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}