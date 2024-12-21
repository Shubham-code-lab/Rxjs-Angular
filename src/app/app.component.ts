import { AfterViewInit, Component } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { RootService } from './service/root.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  startButton!:Observable<Event>;
  endButton!:Observable<Event>;

  constructor(private rootService: RootService){

  }

  ngAfterViewInit(): void {
    this.startButton = fromEvent(document.getElementById('subjectID')!, 'click');
    this.endButton = fromEvent(document.getElementById('subjectID')!, 'click');
  }

  subjectCall() {
    this.rootService.subject$.next('subject');
    // this.rootService.subject$.complete(); //for forkjoin all obervavble has to be completed
  }

  behaviourCall() {
    this.rootService.behaviourSubject$.next('behaviour subject');
    // this.rootService.behaviourSubject$.complete(); //for forkjoin all obervavble has to be completed
  }
}