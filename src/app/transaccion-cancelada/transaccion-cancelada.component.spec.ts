import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionCanceladaComponent } from './transaccion-cancelada.component';

describe('TransaccionCanceladaComponent', () => {
  let component: TransaccionCanceladaComponent;
  let fixture: ComponentFixture<TransaccionCanceladaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransaccionCanceladaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransaccionCanceladaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
