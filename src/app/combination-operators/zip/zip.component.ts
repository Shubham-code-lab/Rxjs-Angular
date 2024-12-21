import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, combineLatest, concat, forkJoin, mergeMap, range, tap, zip } from 'rxjs';
import { RootService } from 'src/app/service/root.service';

@Component({
  selector: 'app-zip',
  templateUrl: './zip.component.html',
  styleUrls: ['./zip.component.scss']
})
export class ZipComponent implements OnInit, OnDestroy{

  private subscription$: Subscription = new Subscription(); 

  constructor(private rootService:RootService){}

  ngOnInit(): void {
    //remember just like pant zip each observable emission is matched with every other observable if one complete or not emit any emission(subject) then zip won't emit.
    // For each emitted value from each observable, zip returns an array of values in the given order.
    // If one of the observables completes, zip will also complete.
    // Zip emits only when all observables have emitted at least one value, and it emits an array containing the latest values from each observable.

    const zip$ =  zip(``
      range(0, 5).pipe(
        //range emission happen fast
        // take(7),
        mergeMap(() => this.rootService.apiResponseWithDelay(2))
      ),
      range(0, 6).pipe(
        // take(5),
        mergeMap(() => this.rootService.apiResponseWithDelay(4))
      ),
      range(0, 5).pipe(
        // take(6),
        mergeMap(() => this.rootService.apiResponseWithDelay(1))
      ),
      range(0, 4).pipe(
        // take(8),
        mergeMap(() => this.rootService.apiResponseWithDelay(3))
      ),
      range(0, 3).pipe(
        // take(4),
        mergeMap(() => this.rootService.apiResponseWithDelay(8))
      ),
      this.rootService.subject$, //subject should be also called that amount of time the amount other obseravble emit to match the emission
      this.rootService.behaviourSubject$
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

    this.subscription$.add(zip$);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}


