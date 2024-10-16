import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewChartComponent } from './add-new-chart.component';

describe('AddNewChartComponent', () => {
  let component: AddNewChartComponent;
  let fixture: ComponentFixture<AddNewChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
