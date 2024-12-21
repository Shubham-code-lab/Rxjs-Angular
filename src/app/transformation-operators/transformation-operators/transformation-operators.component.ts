import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, tap, Subscription, concatMap, merge, of, mergeMap, concat } from 'rxjs';
import { RootService } from 'src/app/service/root.service';

@Component({
  selector: 'app-transformation-operators',
  templateUrl: './transformation-operators.component.html',
  styleUrls: ['./transformation-operators.component.scss']
})
export class TransformationOperatorsComponent  implements OnInit, OnDestroy{

  private subscription:Subscription = new Subscription();

  constructor(private rootService:RootService){}

  ngOnInit(): void {
    // from([
    //   this.rootService.apiResponseWithDelay(6),
    //   this.rootService.apiResponseWithDelay(3),
    //   this.rootService.apiResponseWithDelay(10),
    //   this.rootService.apiResponseWithDelay(9),
    //   // this.rootService.subject$,
    //   this.rootService.behaviourSubject$,
    //   this.rootService.apiResponseWithDelay(1),
    //   this.rootService.apiResponseWithDelay(4),
    // ])
    concat(
      this.rootService.apiResponseWithDelay(6),
      this.rootService.apiResponseWithDelay(3),
      this.rootService.apiResponseWithDelay(10),
      this.rootService.apiResponseWithDelay(9),
      // this.rootService.subject$,
      // this.rootService.behaviourSubject$,  
      this.rootService.apiResponseWithDelay(1),
      this.rootService.apiResponseWithDelay(4),
    )
    .pipe(
      tap((res) => {
        console.log('tap 1', res);
      }),
      // pluck.  //pluck only use is to get property value from object //pluck is depricated as we can use map and optional channing to achive the same

      // map((res) => {
      //   return 'map modify the response';
      // }),

      //for each observalbe reaches here it return new observable of what ever you have in return statement for each  so it can be same also as returing same stuff again and again
      // mergeMap((res) => {
      //   console.log('mergemap', res);
      //   return this.makeTwoApiRequests(2);
      // }),

      // debounceTime(1000),

      //For each outer observable value, switchMap will create a new inner observable. If a new value arrives on the outer observable before the previous inner observable has completed, switchMap will cancel the previous inner observable and subscribe to the new one, ensuring that only the latest inner observable is active and its values are emitted.
      // switchMap((res) => {
      //   return this.makeTwoApiRequests(2);
      // }),

      //pairwise will return array containing previous and current response [previous, current] if there only one observable then it won't procide
      // pairwise(),

      // mergeMap((value) => value),
      concatMap((res) => {
        let temp:any = res;
        if(temp.includes('{') && temp.includes('}')){
          temp = JSON.parse(temp);
          temp = temp.params.sleep;
        }
        return this.rootService.apiResponseWithDelay(2, temp);
      }),

      tap((res) => {
        console.log('tap 2', res);
      })
    )
    .subscribe((data) => {
      console.log('Subscription Data = ', data);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
