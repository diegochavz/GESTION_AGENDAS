import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationServiceImpl} from "../../core/http/implement/authentication.service.impl";
import Formulario from "../../core/models/formulario.model";
import User from "../../core/models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";
import {ValidateService} from "../../core/services/validators";
import UserResponse from "../../core/models/user_response.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  loading: boolean;
  //returnUrl: string;
  error = null;

  constructor(private _formBuilder: FormBuilder,
              private authenticationService: AuthenticationServiceImpl,
              private route: ActivatedRoute,
              private router: Router,
              private validate: ValidateService) {
    if (this.authenticationService.logeado) {
      this.validate.validateUser(this.authenticationService.currentUserValue.tipo_usuario)
    }
    this.loading = true;
  }

  ngOnInit(): void {
    this.formLogin = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      tipo_usuario: ['', Validators.required],
    });
  }

  onFormSubmit() {
    this.loading = false;
    let user = <User>Object.assign({}, this.formLogin.value);
    this.authenticationService.login(user).pipe(first()).subscribe((data: UserResponse) =>{
        if(data){
          this.validate.validateUser(data.tipo_usuario);
        }
      },
      error => {
        this.error = "Mensaje: " + error;
        console.log("errror -> "+error)
      }, ()=>{
      this.loading = true;
      })
  }

}
