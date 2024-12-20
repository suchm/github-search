import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeDetailComponent } from './code-detail.component';

describe('CodeDetailComponent', () => {
  let component: CodeDetailComponent;
  let fixture: ComponentFixture<CodeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
