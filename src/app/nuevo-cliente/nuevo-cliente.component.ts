import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Cliente } from "../model/Cliente";
import { ClienteService } from "../services/cliente.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ClientePersonaRelacion } from "../model/ClientePersonaRelacion";
import { TipoRelacion } from "../model/TipoRelacion";
import { SuccessModalContentComponent } from "../success-modal-content/success-modal-content.component";
import { ErrorModalContentComponent } from "../error-modal-content/error-modal-content.component";
import { ActivatedRoute, Router } from "@angular/router";

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
  codigo: any;

  constructor(
    private clienteService: ClienteService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.codigo = params['codigo'];
      console.log(params['codigo']);

      if(this.codigo) {
        this.findCliente(this.codigo);
        this.findByCodigoEmpresa(this.codigo);
      } else {
        this.cliente.tipoIdentificacion = "";
        this.cliente.tipoCliente = "NAT";
        this.cliente.numeroIdentificacion = "";
        this.cliente.apellidos = "";
        this.cliente.nombres = "";
        this.cliente.correoElectronico = "";
        this.clientePersonaRelacion.estado = "ACT";
      } 
    });
  }

  save() {
    if(!this.codigo) {
      if (this.cliente.tipoCliente === "NAT") {
        if (
          this.cliente.tipoIdentificacion != "" &&
          this.cliente.numeroIdentificacion != "" &&
          this.cliente.apellidos != "" &&
          this.cliente.nombres != "" &&
          this.cliente.correoElectronico != ""
        ) {
          this.clienteService.savePersona(this.cliente).subscribe(
            (data) => {
              console.log("Cliente Natural guardado: ", data);
              this.successModal("Cliente Natural guardado correctamente");
              this.router.navigate(["/clientes"]);
            },
            (error) => {
              if (error.status === 500) {
                this.errorModal(error);
              } else {
                this.errorModal(
                  "Se produjo un error. Por favor, inténtelo de nuevo."
                );
              }
            }
          );
        } else {
          this.errorModal("Complete todos los campos con *");
        }
      } else {
        if (
          this.cliente.tipoIdentificacion != "" &&
          this.cliente.numeroIdentificacion != "" &&
          this.cliente.razonSocial != "" &&
          this.cliente.fechaConstitucion != null &&
          this.cliente.correoElectronico != ""
        ) {
          if (this.personas.length > 0) {
            this.clienteService.saveEmpresa(this.cliente).subscribe(
              (data) => {
                console.log("Cliente Jurídico guardado:", data);
  
                this.personas.forEach((persona) => {
                  persona.codigoEmpresa = data.codigo;
                });
  
                console.log(this.personas);
                this.clienteService.addPersonasEmpresa(this.personas).subscribe(
                  (data2) => {
                    console.log("Personas asociadas agregadas:", data2);
                    this.successModal("Cliente Jurídico guardado correctamente");
                    this.router.navigate(["/clientes"]);
                  },
                  (error) => {
                    if (error.status === 500) {
                      this.errorModal(error.message);
                    } else {
                      this.errorModal(
                        "Se produjo un error. Por favor, inténtelo de nuevo."
                      );
                    }
                  }
                );
              },
              (error) => {
                if (error.status === 500) {
                  this.errorModal(error.message);
                } else {
                  this.errorModal(
                    "Se produjo un error. Por favor, inténtelo de nuevo."
                  );
                }
              }
            );
          } else {
            this.errorModal("Se debe agregar un representante de la empresa");
          }
        } else {
          this.errorModal("Complete todos los campos con *");
        }
      } 
    } else {
      if (this.cliente.tipoCliente === "NAT") {
        if (
          this.cliente.tipoIdentificacion != "" &&
          this.cliente.numeroIdentificacion != "" &&
          this.cliente.apellidos != "" &&
          this.cliente.nombres != "" &&
          this.cliente.correoElectronico != ""
        ) {
          this.clienteService.updatePersona(this.cliente).subscribe(
            (data) => {
              console.log("Cliente Natural actualizado: ", data);
              this.successModal("Cliente Natural actualizado correctamente");
              this.router.navigate(["/clientes"]);
            },
            (error) => {
              if (error.status === 500) {
                this.errorModal(error);
              } else {
                this.errorModal(
                  "Se produjo un error. Por favor, inténtelo de nuevo."
                );
              }
            }
          );
        } else {
          this.errorModal("Complete todos los campos con *");
        }
      } else {
        if (
          this.cliente.tipoIdentificacion != "" &&
          this.cliente.numeroIdentificacion != "" &&
          this.cliente.razonSocial != "" &&
          this.cliente.fechaConstitucion != null &&
          this.cliente.correoElectronico != ""
        ) {
          if (this.personas.length > 0) {
            this.clienteService.updateEmpresa(this.cliente).subscribe(
              (data) => {
                console.log("Cliente empresa actualizado:", data);
  
                this.personas.forEach((persona) => {
                  persona.codigoEmpresa = data.codigo;
                });
  
                console.log(this.personas);

                this.actualizarPersonas();

                this.clienteService.addPersonasEmpresa(this.personas).subscribe(
                  (data2) => {
                    console.log("Personas asociadas agregadas:", data2);
                    this.successModal("Cliente Jurídico actualizado correctamente");
                    this.router.navigate(["/clientes"]);
                  },
                  (error) => {
                    if (error.status === 500) {
                      this.errorModal(error.message);
                    } else {
                      this.errorModal(
                        "Se produjo un error. Por favor, inténtelo de nuevo."
                      );
                    }
                  }
                );
              },
              (error) => {
                if (error.status === 500) {
                  this.errorModal(error.message);
                } else {
                  this.errorModal(
                    "Se produjo un error. Por favor, inténtelo de nuevo."
                  );
                }
              }
            );
          } else {
            this.errorModal("Se debe agregar un representante de la empresa");
          }
        } else {
          this.errorModal("Complete todos los campos con *");
        }
      }
    }
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true, size: "xl" });
    this.listPersona();
    this.listTipoRelacion();
  }

  successModal(message: string) {
    const modalRef = this.modalService.open(SuccessModalContentComponent);
    modalRef.componentInstance.message = message;
  }

  errorModal(message: string) {
    const modalRef = this.modalService.open(ErrorModalContentComponent);
    modalRef.componentInstance.message = message;
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

  findCliente(id: number) {
    this.clienteService.findById(id).subscribe(
      (data) => {
        this.cliente = data;
      },
      (error) => {
        console.error(error);
      }
    );
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

  addPersona() {
    this.clientePersonaRelacion.codigoPersona = 0;
    this.clientePersonaRelacion.codigoRelacion = "";
    this.clientePersonaRelacion.estado = "";
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

  actualizarPersonas() {
    this.clienteService.updatePersonaEmpresa(this.personas);
  }
}
