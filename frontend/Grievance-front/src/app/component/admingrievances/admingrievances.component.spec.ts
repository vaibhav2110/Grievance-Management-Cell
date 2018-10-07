import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmingrievancesComponent } from './admingrievances.component';

describe('AdmingrievancesComponent', () => {
  let component: AdmingrievancesComponent;
  let fixture: ComponentFixture<AdmingrievancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmingrievancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmingrievancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
