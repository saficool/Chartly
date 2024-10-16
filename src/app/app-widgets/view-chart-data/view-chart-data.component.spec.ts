import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChartDataComponent } from './view-chart-data.component';

describe('ViewChartDataComponent', () => {
  let component: ViewChartDataComponent;
  let fixture: ComponentFixture<ViewChartDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewChartDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewChartDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
