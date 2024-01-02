import { Component } from "@angular/core";
import { ClienteService } from "../services/cliente.service";
import { Cliente } from "../model/Cliente";

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styleUrl: "./clientes.component.css",
})
export class ClientesComponent {
  clientes: any[] = [];
  cliente: Cliente = {} as Cliente;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.cliente.tipoIdentificacion = "CED";
    this.cliente.numeroIdentificacion = "";
    this.listAll();
  }

  listAll() {
    this.clienteService.listAll().subscribe(
      (data) => {        
        this.clientes = data.map(cliente => ({
          ...cliente,
          identificacionNombre: this.tipoIdentificacionNombre(cliente.tipoIdentificacion),
          tipoNombre: this.tipoClienteNombre(cliente.tipoCliente)
        }));
      },
      (error) => {
        console.error(error);
      }
    );
  }

  findByIdentificacion() {
    if (this.cliente.numeroIdentificacion.length > 0) {
      this.clienteService
        .findByIdentificacion(
          this.cliente.tipoIdentificacion,
          this.cliente.numeroIdentificacion
        )
        .subscribe(
          (data) => {
            if (data) {
              this.clientes = [data].map(cliente => ({
                ...cliente,
                identificacionNombre: this.tipoIdentificacionNombre(cliente.tipoIdentificacion),
                tipoNombre: this.tipoClienteNombre(cliente.tipoCliente)
              }));
            } else {
              console.log("Cliente no encontrado");
            }
          },
          (error) => {
            console.error(error);
            console.log("Error al buscar");
          }
        );
    } else {
      console.error("Numero de identificacion vacío");
    }
  }

  tipoIdentificacionNombre(tipoIdentificacion: String): String {
    switch (tipoIdentificacion) {
      case 'CED':
        return 'Cédula';
      case 'PAS':
        return 'Pasaporte';
      case 'RUC':
        return 'RUC';
      default:
        return 'Desconocido';
    }
  }

  tipoClienteNombre(tipoCliente: String): String {
    switch (tipoCliente) {
      case 'NAT':
        return 'Natural';
      case 'JUR':
        return 'Jurídico';      
      default:
        return 'Desconocido';
    }
  }
}
