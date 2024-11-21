import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarArchivosComponent } from './administrar-archivos.component';

describe('AdministrarArchivosComponent', () => {
  let component: AdministrarArchivosComponent;
  let fixture: ComponentFixture<AdministrarArchivosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrarArchivosComponent]
    });
    fixture = TestBed.createComponent(AdministrarArchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
