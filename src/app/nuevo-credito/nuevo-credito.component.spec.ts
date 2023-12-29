import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoCreditoComponent } from './nuevo-credito.component';

describe('NuevoCreditoComponent', () => {
  let component: NuevoCreditoComponent;
  let fixture: ComponentFixture<NuevoCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoCreditoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevoCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
