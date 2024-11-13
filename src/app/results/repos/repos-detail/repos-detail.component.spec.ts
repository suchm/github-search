import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReposDetailComponent } from './repos-detail.component';

describe('ReposDetailComponent', () => {
  let component: ReposDetailComponent;
  let fixture: ComponentFixture<ReposDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReposDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReposDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
