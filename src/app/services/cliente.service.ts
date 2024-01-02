import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ClienteService {
  private apiUrl = "http://localhost:8080/clientes";

  constructor(private http: HttpClient) {}
  listAll() {
    return this.http.get<any[]>(`${this.apiUrl}/listar`);
  }

  findById(id: Number) {
    return this.http.get<any>(`${this.apiUrl}/buscar/${id}`);
  }

  findByIdentificacion(tipoIdentificacion: String, numeroIdentificacion: String) {
    return this.http.get<any>(`${this.apiUrl}/buscar/${tipoIdentificacion}/${numeroIdentificacion}`);
  }

  //PERSONA
  listPersona() {
    return this.http.get<any>(`${this.apiUrl}/persona/listar`);
  }

  savePersona(persona: any) {
    return this.http.post<any>(`${this.apiUrl}/persona/crear`, persona);
  }

  updatePersona(persona: any) {
    return this.http.put<any>(`${this.apiUrl}/persona/actualizar`, persona);
  }
  
  deletePersona(id: number) {
    return this.http.put<any>(`${this.apiUrl}/persona/eliminar/${id}`, id);
  }

  //EMPRESA
  saveEmpresa(empresa: any) {
    return this.http.post<any>(`${this.apiUrl}/empresa/crear`, empresa);
  }

  addPersonasEmpresa(personas: any[]) {
    return this.http.post<any>(`${this.apiUrl}/empresa/persona/agregar`, personas);
  }

  //TIPO RELACION
  listTipoRelacion() {
    return this.http.get<any>(`${this.apiUrl}/relacion/listar`);
  }
}
