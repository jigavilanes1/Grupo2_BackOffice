import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteNaturalComponent } from './cliente-natural.component';

describe('ClienteNaturalComponent', () => {
  let component: ClienteNaturalComponent;
  let fixture: ComponentFixture<ClienteNaturalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteNaturalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClienteNaturalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
