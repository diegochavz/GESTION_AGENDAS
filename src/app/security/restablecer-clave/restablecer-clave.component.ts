import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationServiceImpl} from "../../core/http/implement/authentication.service.impl";
import {ActivatedRoute, Router} from "@angular/router";
import {ValidateService} from "../../core/services/validators";
import {ToasterService} from "../../core/services/toaster.service";

@Component({
  selector: 'app-restablecer-clave',
  templateUrl: './restablecer-clave.component.html',
  styleUrls: ['./restablecer-clave.component.scss']
})
export class RestablecerClaveComponent implements OnInit {

  formLogin: FormGroup;
  loading: boolean;

  constructor(private _formBuilder: FormBuilder,
              private authenticationService: AuthenticationServiceImpl,
              private route: ActivatedRoute,
              private router: Router,
              private validate: ValidateService,
              private toasterService: ToasterService) {
    if (this.authenticationService.logeado) {
      this.validate.validateUser(this.authenticationService.currentUserValue.tipo_usuario)
    }
    this.loading = true;
  }

  ngOnInit(): void {
    this.formLogin = this._formBuilder.group({
      correo: ['', [Validators.required]],
    });
  }

  onFormSubmit() {
    this.loading = false;
    let correo = this.formLogin.get('correo').value.trim();
    console.log(correo)
    this.authenticationService.restablecerClave(correo).subscribe(() => {
      this.toasterService.openSnackBarCumtom(
        'Se restableció la constraseña satisfactoriamente, revisa tu correo',
        'success'
      )
        this.router.navigate(['../']);
      },
      error => {
        this.toasterService.openSnackBarCumtom(
          'La cuenta no pertenece a ningun usuario',
          'error'
        )
        this.loading = true;
      }, () => {
        this.loading = true;
      })
  }

}
