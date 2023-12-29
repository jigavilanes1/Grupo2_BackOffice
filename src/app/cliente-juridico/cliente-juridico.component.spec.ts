import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteJuridicoComponent } from './cliente-juridico.component';

describe('ClienteJuridicoComponent', () => {
  let component: ClienteJuridicoComponent;
  let fixture: ComponentFixture<ClienteJuridicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteJuridicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClienteJuridicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
