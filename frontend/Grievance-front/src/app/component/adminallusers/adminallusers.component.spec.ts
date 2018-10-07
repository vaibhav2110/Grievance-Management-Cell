import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminallusersComponent } from './adminallusers.component';

describe('AdminallusersComponent', () => {
  let component: AdminallusersComponent;
  let fixture: ComponentFixture<AdminallusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminallusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminallusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
