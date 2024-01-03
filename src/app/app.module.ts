import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

/************************* COMPONENTS ************************************** */
import { OpcionesComponent } from './opciones/opciones.component';
import { LoginBoComponent } from './login-bo/login-bo.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { CreditosComponent } from './creditos/creditos.component';
import { NuevaCuentaComponent } from './nueva-cuenta/nueva-cuenta.component';
import { NuevoCreditoComponent } from './nuevo-credito/nuevo-credito.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { TransaccionCanceladaComponent } from './transaccion-cancelada/transaccion-cancelada.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NuevoClienteComponent } from './nuevo-cliente/nuevo-cliente.component';
import { SuccessModalContentComponent } from './success-modal-content/success-modal-content.component';
import { ErrorModalContentComponent } from './error-modal-content/error-modal-content.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    OpcionesComponent,
    LoginBoComponent,
    NuevoClienteComponent,
    CreditosComponent,
    ClientesComponent,
    CuentasComponent,
    NuevaCuentaComponent,
    NuevoCreditoComponent,
    RegistrarseComponent,
    TransaccionCanceladaComponent,
    SuccessModalContentComponent,
    ErrorModalContentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
