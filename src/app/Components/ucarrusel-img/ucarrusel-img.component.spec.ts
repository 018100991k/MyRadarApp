import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UCarruselImgComponent } from './ucarrusel-img.component';

describe('UCarruselImgComponent', () => {
  let component: UCarruselImgComponent;
  let fixture: ComponentFixture<UCarruselImgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UCarruselImgComponent]
    });
    fixture = TestBed.createComponent(UCarruselImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
