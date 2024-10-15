import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppChartlyComponent } from './app-chartly.component';

describe('AppChartlyComponent', () => {
  let component: AppChartlyComponent;
  let fixture: ComponentFixture<AppChartlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppChartlyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppChartlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
