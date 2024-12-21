import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformationOperatorsComponent } from './transformation-operators.component';

describe('TransformationOperatorsComponent', () => {
  let component: TransformationOperatorsComponent;
  let fixture: ComponentFixture<TransformationOperatorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransformationOperatorsComponent]
    });
    fixture = TestBed.createComponent(TransformationOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
