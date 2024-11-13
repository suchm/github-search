import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitsDetailComponent } from './commits-detail.component';

describe('CommitsDetailComponent', () => {
  let component: CommitsDetailComponent;
  let fixture: ComponentFixture<CommitsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommitsDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
