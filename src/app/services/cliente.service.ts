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

  findById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/buscar/${id}`);
  }

  findByIdentificacion(tipoIdentificacion: String, numeroIdentificacion: String) {
    return this.http.get<any>(`${this.apiUrl}/buscar/${tipoIdentificacion}/${numeroIdentificacion}`);
  }

  //PERSONA
  savePersona(persona: any) {
    return this.http.post<any>(`${this.apiUrl}/persona/crear`, persona);
  }

  updatePersona(persona: any) {
    return this.http.put<any>(`${this.apiUrl}/persona/actualizar`, persona);
  }
  
  deletePersona(id: number) {
    return this.http.put<any>(`${this.apiUrl}/persona/eliminar/${id}`, id);
  }
}
