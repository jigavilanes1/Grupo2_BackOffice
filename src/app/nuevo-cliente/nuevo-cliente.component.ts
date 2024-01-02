import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Cliente } from "../model/Cliente";
import { ClienteService } from "../services/cliente.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ClientePersonaRelacion } from "../model/ClientePersonaRelacion";
import { TipoRelacion } from "../model/TipoRelacion";

@Component({
  selector: "app-nuevo-cliente",
  templateUrl: "./nuevo-cliente.component.html",
  styleUrl: "./nuevo-cliente.component.css",
})
export class NuevoClienteComponent {
  cliente: Cliente = {} as Cliente;
  clientes: any[] = [];
  clientePersonaRelacion: ClientePersonaRelacion = {} as ClientePersonaRelacion;
  personas: any[] = [];
  personasAsociadas: any[] = [];
  tipoRelacion: TipoRelacion = {} as TipoRelacion;
  relaciones: any[] = [];
  personasIdentificacion: any[] = [];

  constructor(
    private clienteService: ClienteService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.cliente.tipoIdentificacion = "";
    this.cliente.tipoCliente = "NAT";
    this.cliente.numeroIdentificacion = "";
    this.cliente.apellidos = "";
    this.cliente.nombres = "";
    this.cliente.correoElectronico = "";
  }

  save() {
    if(this.cliente.tipoCliente === "NAT") {
      if (
        this.cliente.tipoIdentificacion != "" &&
        this.cliente.numeroIdentificacion != "" &&
        this.cliente.apellidos != "" &&
        this.cliente.nombres != "" &&
        this.cliente.correoElectronico != ""
      ) {
        this.clienteService.savePersona(this.cliente).subscribe(
          (data) => {
            console.log("Cliente persona guardado:", data);
          },
          (error) => {
            if (error.status === 500) {
              alert(error.message);
            } else {
              alert("Se produjo un error. Por favor, inténtelo de nuevo.");
            }
          }
        );
      }
    } else {
      if (
        this.cliente.numeroIdentificacion != "" &&
        this.cliente.razonSocial != "" &&
        this.cliente.fechaConstitucion != null &&
        this.cliente.correoElectronico != "" &&
        this.personas.length > 0
      ) {
        this.clienteService.saveEmpresa(this.cliente).subscribe(
          (data) => {
            console.log("Cliente empresa guardado:", data);
          },
          (error) => {
            if (error.status === 500) {
              alert(error.message);
            } else {
              alert("Se produjo un error. Por favor, inténtelo de nuevo.");
            }
          }
        );
        console.log(this.personas);
        this.clienteService.addPersonasEmpresa(this.personas).subscribe(
          (data) => {
            console.log("Personas asociadas agregadas:", data);
          },
          (error) => {
            if (error.status === 500) {
              alert(error.message);
            } else {
              alert("Se produjo un error. Por favor, inténtelo de nuevo.");
            }
          }
        );
      }
    }
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true, size: "xl" });
    this.listPersona();
    this.listTipoRelacion();
  }

  listPersona() {
    this.clienteService.listPersona().subscribe(
      (data) => {
        this.clientes = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  listTipoRelacion() {
    this.clienteService.listTipoRelacion().subscribe(
      (data) => {
        this.relaciones = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  findById(id: Number, index: Number) {
    this.clienteService.findById(id).subscribe(
      (data) => {
        const indexExistente = this.personasIdentificacion.find(
          (aux) => aux.id === index
        );

        if (indexExistente) {
          indexExistente.numeroIdentificacion = data.numeroIdentificacion;
        } else {
          this.personasIdentificacion.push({
            id: index,
            numeroIdentificacion: data.numeroIdentificacion,
          });
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  addPersona() {
    this.clientePersonaRelacion.codPersona = 0;
    this.clientePersonaRelacion.codRelacion = "";
    this.personas.push({ ...this.clientePersonaRelacion });
    this.clientePersonaRelacion = {} as ClientePersonaRelacion;
  }

  quitarPersona(index: number) {
    this.personas.splice(index, 1);
    const indexExistente = this.personasIdentificacion.findIndex(
      (aux) => aux.id === index
    );
    if (indexExistente !== -1) {
      this.personasIdentificacion.splice(indexExistente, 1);
    }
  }

  savePersonas() {
    this.personas.push({ ...this.clientePersonaRelacion });
    this.personas.pop();
    this.clientePersonaRelacion = {} as ClientePersonaRelacion;    
  }
}
