import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListissuesComponent } from './listissues.component';

describe('ListissuesComponent', () => {
  let component: ListissuesComponent;
  let fixture: ComponentFixture<ListissuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListissuesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListissuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
