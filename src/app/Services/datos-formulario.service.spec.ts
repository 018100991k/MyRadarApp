import { TestBed } from '@angular/core/testing';

import { DatosFormularioService } from './datos-formulario.service';

describe('DatosFormularioService', () => {
  let service: DatosFormularioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosFormularioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
