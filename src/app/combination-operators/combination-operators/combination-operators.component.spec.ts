import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinationOperatorsComponent } from './combination-operators.component';

describe('CombinationOperatorsComponent', () => {
  let component: CombinationOperatorsComponent;
  let fixture: ComponentFixture<CombinationOperatorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CombinationOperatorsComponent]
    });
    fixture = TestBed.createComponent(CombinationOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
