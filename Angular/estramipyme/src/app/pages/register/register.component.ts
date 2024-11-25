import {Component, inject, signal} from '@angular/core';
import {Router} from "@angular/router";
import {DataProcService} from "@services/data-proc.service";
import {FormsModule, NgForm} from "@angular/forms";
import {RegisterDataModel} from "@models/registerdata.models";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  passwordDoNotMatch = signal<boolean>(false);
  invalidSurname = signal<boolean>(false);
  invalidBusinessName = signal<boolean>(false)
  invalidId = signal<boolean>(false)
  invalidName = signal<boolean>(false);
  router!: Router;
  dataproc!: DataProcService;

  constructor(router: Router, dataproc: DataProcService) {
    this.router = router;
    this.dataproc = dataproc;
  }

  navigateTo(path: string) {
    this.router.navigate([path])
  }

  _checkName(value: string) {
    this.invalidName.set(true)
    return value.trim().length > 0;
  }

  _checkSurname(value: string) {
    this.invalidSurname.set(true)
    return value.trim().length > 0;
  }

  _checkBusinessName(value: string) {
    this.invalidBusinessName.set(true)
    return value.trim().length > 0;
  }

  _checkId(value: number) {
    this.invalidId.set(true)
    return Number(value) > 0;
  }


/*  onSubmit(form: NgForm) {
    console.log("valores del form")
    console.log(form.value)
    if (!form.valid) return;
    const url = "http://localhost:8080/estramipyme/api/v1/user/register"
    const values = form.value as RegisterDataModel
    if (values.password !== values.confirmPassword) {
      this.passwordDoNotMatch.set(true);
      return;
    }
    // if (
    //   this._checkBusinessName(values.businessName) ||
    //   this._checkId(values.docNumber) ||
    //   this._checkSurname(values.surname) ||
    //   this._checkName(values.name)
    // ) return;
    this.dataproc.sendData(url, values).subscribe({

      next: response => {

        console.log('Data posted successfully', response)
        console.log(form)
        this.navigateTo('')
      },
      error: err => {
        console.error(err)
      }
    })
  }*/

  onSubmit(form: NgForm) {
    console.log("Valores del formulario:");
    console.log(form.value);
  
    if (!form.valid) {
      console.error("Formulario inválido");
      return;
    }
  
    const url = "http://localhost:8080/estramipyme/api/v1/user/register";
    const formValues = form.value;
  
    // Valida que las contraseñas coincidan
    if (formValues.password !== formValues.confirmPassword) {
      this.passwordDoNotMatch.set(true);
      return;
    }
  
    // Mapea los valores del formulario al formato esperado por el backend
    const requestData = {
      businessname: formValues.businessName, // Cambia a la clave esperada por el backend
      persontype: formValues.personType,
      doctype: formValues.docType,
      docnumber: formValues.docNumber,
      password: formValues.password, // Incluye otros valores según el endpoint
      email: formValues.email,
      sector: formValues.sector,
      surname: formValues.surname
    };
  
    console.log("Datos a enviar:");
    console.log(requestData);
  
    // Enviar datos al backend
    this.dataproc.sendData(url, requestData).subscribe({
      next: (response) => {
        console.log("Datos enviados con éxito:", response);
        this.navigateTo(''); // Navega a la ruta deseada tras éxito
      },
      error: (err) => {
        console.error("Error al enviar los datos:", err);
      }
    });
  }
}
