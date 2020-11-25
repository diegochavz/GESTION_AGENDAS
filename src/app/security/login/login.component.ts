import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationServiceImpl} from "../../core/http/implement/authentication.service.impl";
import Formulario from "../../core/models/formulario.model";
import User from "../../core/models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";
import {ValidateUser} from "../../core/services/validate_usuario.service";
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
              private validateUser: ValidateUser) {
    if (this.authenticationService.logeado) {
      this.validateUser.validateUser(this.authenticationService.currentUserValue.tipo_usuario)
    }
    this.loading = true;
  }

  ngOnInit(): void {
    this.formLogin = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      tipo_usuario: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
   // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onFormSubmit() {
    this.loading = false;
    let user = <User>Object.assign({}, this.formLogin.value);
    console.log(user)
    this.authenticationService.login(user).pipe(first()).subscribe((data: UserResponse) =>{
      console.log(data)
        if(data){
          this.validateUser.validateUser(data.tipo_usuario);
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
