import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessModalContentComponent } from './success-modal-content.component';

describe('SuccessModalContentComponent', () => {
  let component: SuccessModalContentComponent;
  let fixture: ComponentFixture<SuccessModalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessModalContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccessModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
