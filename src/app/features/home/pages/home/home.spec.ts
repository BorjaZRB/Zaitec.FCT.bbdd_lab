import { ComponentFixture, TestBed } from '@angular/core/testing';

// Se importa como HomeComponent
import { HomeComponent } from './home.component';

describe('HomeComponent', () => { // Aquí se puede dejar 'HomeComponent' o 'Home'
  let component: HomeComponent; 
  let fixture: ComponentFixture<HomeComponent>; 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent); 
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
