import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInboxSidebarComponent } from './add-inbox-sidebar.component';

describe('AddInboxSidebarComponent', () => {
  let component: AddInboxSidebarComponent;
  let fixture: ComponentFixture<AddInboxSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInboxSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInboxSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
