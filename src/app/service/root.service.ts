import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RootService {
  subject$: Subject<any> = new Subject();
  behaviourSubject$: BehaviorSubject<any> = new BehaviorSubject('behaviour subject');

  constructor(
    private http: HttpClient
  ) { }

  apiResponseWithDelay(milliSecond:number, text:string = '') {
    return this.http.get(`https://fakeresponder.com/?sleep=${milliSecond * 100}`, {
      responseType: 'text',
    })
    .pipe(
      tap((res)=>{
        console.log(`response for ${text}`);
      })
    )
  }
}
