import { Component } from "@angular/core";
import { ClienteService } from "../services/cliente.service";
import { Cliente } from "../model/Cliente";
import { SuccessModalContentComponent } from "../success-modal-content/success-modal-content.component";
import { ErrorModalContentComponent } from "../error-modal-content/error-modal-content.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styleUrl: "./clientes.component.css",
})
export class ClientesComponent {
  clientes: any[] = [];
  cliente: Cliente = {} as Cliente;
  personas: any[] = [];

  constructor(
    private clienteService: ClienteService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cliente.tipoIdentificacion = "CED";
    this.cliente.numeroIdentificacion = "";
    this.listAll();
  }

  listAll() {
    this.clienteService.listAll().subscribe(
      (data) => {
        this.clientes = data.map((cliente) => ({
          ...cliente,
          identificacionNombre: this.tipoIdentificacionNombre(
            cliente.tipoIdentificacion
          ),
          tipoNombre: this.tipoClienteNombre(cliente.tipoCliente),
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
              this.clientes = [data].map((cliente) => ({
                ...cliente,
                identificacionNombre: this.tipoIdentificacionNombre(
                  cliente.tipoIdentificacion
                ),
                tipoNombre: this.tipoClienteNombre(cliente.tipoCliente),
              }));
            } else {
              this.errorModal("Cliente no encontrado");
            }
          },
          (error) => {
            console.error(error);
            console.log("Error al buscar");
          }
        );
    } else {
      this.errorModal("Numero de identificacion vacío");
    }
  }

  seleccionarCliente(cliente: any) {
    this.cliente = cliente;
  }

  seleccionado(cliente: any): boolean {
    return this.cliente === cliente;
  }

  editar() {
    if (this.cliente.codigo > new Number(0)) {
      this.router.navigate(["editarCliente", this.cliente.codigo]);
    } else {
      this.errorModal("No se ha seleccionado ningun cliente");
    }
  }

  eliminar() {
    if (this.cliente.tipoIdentificacion === "NAT") {
      this.clienteService.deletePersona(this.cliente.codigo).subscribe(
        (data) => {
          this.cliente = data;
          this.listAll();
          this.router.navigate(["/clientes"]);
          this.successModal("Cliente eliminado");
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.findByCodigoEmpresa(this.cliente.codigo);

      const personasInactivas = this.personas.every(
        (persona) => persona.estado === "INA"
      );

      if (personasInactivas) {        
        this.clienteService.deleteEmpresa(this.cliente.codigo).subscribe(
          (data) => {
            this.cliente = data;
            this.successModal("Cliente eliminado");
            this.listAll();
            this.router.navigate(["/clientes"]);
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        this.errorModal("No se puede eliminar empresa. Personas asociadas siguen activas en la empresa");
      }
    }
  }

  findByCodigoEmpresa(id: Number) {
    this.clienteService.findByCodigoEmpresa(id).subscribe(
      (data) => {
        this.personas = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  tipoIdentificacionNombre(tipoIdentificacion: String): String {
    switch (tipoIdentificacion) {
      case "CED":
        return "Cédula";
      case "PAS":
        return "Pasaporte";
      case "RUC":
        return "RUC";
      default:
        return "Desconocido";
    }
  }

  tipoClienteNombre(tipoCliente: String): String {
    switch (tipoCliente) {
      case "NAT":
        return "Natural";
      case "JUR":
        return "Jurídico";
      default:
        return "Desconocido";
    }
  }

  openModal(content: any) {
    if (this.cliente.codigo > new Number(0)) {
      this.modalService.open(content, { centered: true, size: "xl" });
    } else {
      this.errorModal("No se ha seleccionado un cliente");
    }
  }

  successModal(message: string) {
    const modalRef = this.modalService.open(SuccessModalContentComponent);
    modalRef.componentInstance.message = message;
  }

  errorModal(message: string) {
    const modalRef = this.modalService.open(ErrorModalContentComponent);
    modalRef.componentInstance.message = message;
  }
}
