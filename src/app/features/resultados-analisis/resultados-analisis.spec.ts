import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosAnalisis } from './resultados-analisis';

describe('ResultadosAnalisis', () => {
  let component: ResultadosAnalisis;
  let fixture: ComponentFixture<ResultadosAnalisis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadosAnalisis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadosAnalisis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
