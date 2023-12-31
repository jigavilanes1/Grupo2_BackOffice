import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, RoutesRecognized } from '@angular/router';

/************************* COMPONENTS ************************************** */
import { OpcionesComponent } from './opciones/opciones.component';
import { LoginBoComponent } from './login-bo/login-bo.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { ClienteJuridicoComponent } from './cliente-juridico/cliente-juridico.component';
import { ClienteNaturalComponent } from './cliente-natural/cliente-natural.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CreditosComponent } from './creditos/creditos.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { NuevaCuentaComponent } from './nueva-cuenta/nueva-cuenta.component';
import { NuevoCreditoComponent } from './nuevo-credito/nuevo-credito.component';

const routes: Routes = [
  
  { path: '', component: OpcionesComponent},
  { path: 'loginBO', component: LoginBoComponent},
  { path: 'clienteJuridico', component: ClienteJuridicoComponent},
  { path: 'clienteNatural', component: ClienteNaturalComponent},
  { path: 'clientes', component: ClientesComponent},
  { path: 'cuentas', component: CuentasComponent},
  { path: 'nuevaCuenta', component: NuevaCuentaComponent},
  { path: 'nuevoCredito', component: NuevoCreditoComponent},
  { path: 'registrarse', component: RegistrarseComponent},
  { path: 'creditos', component: CreditosComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
