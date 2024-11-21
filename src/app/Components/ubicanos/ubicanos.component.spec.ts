import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicanosComponent } from './ubicanos.component';

describe('UbicanosComponent', () => {
  let component: UbicanosComponent;
  let fixture: ComponentFixture<UbicanosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UbicanosComponent]
    });
    fixture = TestBed.createComponent(UbicanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
