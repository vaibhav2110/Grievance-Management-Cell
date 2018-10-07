import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminnewusersComponent } from './adminnewusers.component';

describe('AdminnewusersComponent', () => {
  let component: AdminnewusersComponent;
  let fixture: ComponentFixture<AdminnewusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminnewusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminnewusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
