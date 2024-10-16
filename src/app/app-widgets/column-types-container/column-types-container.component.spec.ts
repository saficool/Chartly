import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnTypesContainerComponent } from './column-types-container.component';

describe('ColumnTypesContainerComponent', () => {
  let component: ColumnTypesContainerComponent;
  let fixture: ComponentFixture<ColumnTypesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnTypesContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnTypesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
