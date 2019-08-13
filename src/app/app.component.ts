import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Persona } from './models/persona.model';
import { Premio } from './models/premio.model';
import { PremioPersona } from './models/premio_persona.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private http: HttpClient) {
    this.getPersonas();
    this.getPremios();
    this.getPremiosPersonas();
  }
  apiUrl = 'http://localhost:8080';
  nuevaPersona = {};
  personas = [];
  premios = [];
  premiosPersonas = [];
  prepareEditPersona(f: NgForm, persona) {
    f.setValue(persona);
  }

  borrarPremio(id) {
    if(!confirm("Seguro quiere borrar el premio?")) return false;
    this.deleteRequest(`${this.apiUrl}/premios/${id}`)
      .subscribe(
        results => {
          this.getPremios();
          this.getPremiosPersonas();
        },
        err => alert(err)
      );
  }

  borrarPersona(id) {
    if(!confirm("Seguro quiere borrar la persona?")) return false;
    this.deleteRequest(`${this.apiUrl}/personas/${id}`)
      .subscribe(
        results => {
          this.getPersonas();
          this.getPremiosPersonas();
        },
        err => alert(err)
      );
  }

  borrarPremioPersona(id) {
    if(!confirm("Seguro quiere eliminar el registro? El premio no se devuelve.")) return false;
    this.deleteRequest(`${this.apiUrl}/premios_personas/${id}`)
      .subscribe(
        results => this.getPremiosPersonas(),
        err => alert(err)
      );
  }

  onSubmitPersona(f: NgForm) {
    if (f.valid) {
      let persona = f.value;
      persona.id = persona.id == ''?null:persona.id;
      this.postRequest(`${this.apiUrl}/personas`, f.value)
      .subscribe(
        results => this.getPersonas(),
        err => alert(err)
      );
      f.reset();
    }
  }

  onSubmitPremio(f: NgForm) {
    if (f.valid) {
      this.postRequest(`${this.apiUrl}/premios`, f.value)
      .subscribe(
        results => this.getPremios(),
        err => alert(err)
      );
      f.reset();
    }
  }
  getPersonas() {    
    this.getPersonasRequest(`${this.apiUrl}/personas`)
      .subscribe(
        results => this.personas = results,
        err => console.error('HTTP Error', err)
      );
  }
  getPersonasRequest(url: string) {
    return this.http.get<Persona[]>(url).pipe();
  }
  getPremios() {
    this.getPremiosRequest(`${this.apiUrl}/premios`)
      .subscribe(
        results => this.premios = results,
        err => console.error('HTTP Error', err)
      );
  }
  getPremiosPersonasRequest(url: string) {
    return this.http.get<PremioPersona[]>(url).pipe();
  }  
  getPremiosPersonas() {
    this.getPremiosPersonasRequest(`${this.apiUrl}/premios_personas`)
      .subscribe(
        results => this.premiosPersonas = results,
        err => console.error('HTTP Error', err)
      );
  }
  getPremiosRequest(url: string) {
    return this.http.get<Premio[]>(url).pipe();
  }
  postRequest(url: string, data: any) {
    return this.http.post(url, data).pipe();
  }
  deleteRequest(url: string) {
    return this.http.delete(url).pipe();
  }

  realizarSorteo(){
    this.realizarSorteoRequest(`${this.apiUrl}/premios/repartir`)
      .subscribe(
        results => {
          if (results<0){
            alert('No se entregaron premios. No hay participantes o no hay premios.')
          } 
          else{
            this.getPremios();
            this.getPremiosPersonas();
          }
        },
        err => console.error('HTTP Error', err)
      );
  }
  realizarSorteoRequest(url: string){
    return this.http.get<number>(url).pipe();
  }

}
