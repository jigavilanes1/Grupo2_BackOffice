import { Component } from "@angular/core";
import { ClienteService } from "../services/cliente.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styleUrl: "./clientes.component.css",
})
export class ClientesComponent {
  clientes: any[] = [];
  cliente: any = {};
  tipoIdentificacion: String = '';
  numeroIdentificacion: String = '';

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {
    this.listAll();
  }

  listAll() {
    this.clienteService.listAll().subscribe(
      (data) => {
        this.clientes = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  findByIdentificacion() {
    this.clienteService.findByIdentificacion(this.tipoIdentificacion, this.numeroIdentificacion).subscribe(
      (data) => {
        this.clientes = [data];
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
