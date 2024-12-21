import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, buffer, bufferCount, bufferTime, interval, tap } from 'rxjs';
import { RootService } from 'src/app/service/root.service';

@Component({
  selector: 'app-buffer',
  templateUrl: './buffer.component.html',
  styleUrls: ['./buffer.component.scss']
})
export class BufferComponent implements OnInit, OnDestroy{

  private subscription:Subscription = new Subscription();

  constructor(private rootService:RootService){}

  ngOnInit(): void {

  }

  buffer(){
    const buffer$ = interval(1000)
    .pipe(
      tap((res) => {
        console.log('tap 1', res);
      }),
      buffer(this.rootService.subject$),    //buffer is fill with the observable emitted value i.e:- interval, the filled buffer is only emitted further when the provided observable emit value i.e :- subject$
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

    this.subscription.add(buffer$);
  }

  bufferCount(){
    const bufferCount$ = interval(3000)
    .pipe(
      tap((res) => {   //for every 3second emit observable,
        console.log('tap 1', res);
      }),
      //second parameter is optional
      bufferCount(10,5),  //push it at end and pop from front of by maintaining buffer size of 10.  
      tap((res) => {      //start new buffer every 5 emit //OR //emit it for every 5 observable emit given that buffer contain 10 value (otherwise wait until buffer get 10 value).
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

    this.subscription.add(bufferCount$);
  }

  bufferTime(){
    const bufferTime$ = interval(1000)
    .pipe(
      tap((res) => {
        console.log('tap 1', res);
      }),
      bufferTime(2000,5000),   //for every 3second create new buffer   //emit after 5 second
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

    this.subscription.add(bufferTime$);
  }

  bufferToggle(){
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
