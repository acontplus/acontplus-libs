import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicSelect } from './dynamic-select';

describe('DynamicSelect', () => {
  let component: DynamicSelect;
  let fixture: ComponentFixture<DynamicSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
