import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test01';
  nuevaPersona = {
    nombres: 'Dennis'
  };
  personas = [
    {
      id: 1,
      nombres: 'Carlos',
      apellidos: 'Suescun',
      tipo_doc: 'CC',
      documento: '1090',
      fecha_nacimiento: '10/12/1998',
    },
    {
      id: 2,
      nombres: 'Jenny',
      apellidos: 'Toloza',
      tipo_doc: 'CC',
      documento: '1091',
      fecha_nacimiento: '05/10/1995',
    },
  ];
  premios = [
    {
      id: 1,
      codigo: '01',
      descripcion: 'Carro',
      cantidad: 20,
    },
    {
      id: 2,
      codigo: '02',
      descripcion: 'Moto',
      cantidad: 30,
    },
    {
      id: 3,
      codigo: '03',
      descripcion: 'Viaje',
      cantidad: 40,
    },
  ];
  prepareEditPersona(f: NgForm, persona) {
    f.setValue(persona);
  }

  borrarPremio(id) {
    alert(`Borrando ${id}`);
  }

  borrarPersona(id) {
    alert(`Borrando ${id}`);
  }

  borrarPremioPersona(id) {
    alert(`Borrando ${id}`);
  }

  realizarSorteo() {
    return;
  }

  onSubmitPersona(f: NgForm) {
    if (f.valid) {
      this.personas.push(Object.assign({}, f.value));
      f.reset();
    }
  }

  onSubmitPremio(f: NgForm) {
    if (f.valid) {
      this.premios.push(Object.assign({}, f.value));
      f.reset();
    }
  }

}
