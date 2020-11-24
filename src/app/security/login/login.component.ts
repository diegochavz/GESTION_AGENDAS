import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationServiceImpl} from "../../core/http/implement/authentication.service.impl";
import Formulario from "../../core/models/formulario.model";
import User from "../../core/models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  loading:boolean;

  returnUrl: string;

  error = '';

  constructor(private _formBuilder: FormBuilder,
              private authenticationService: AuthenticationServiceImpl,
              private route: ActivatedRoute,
              private router: Router) {
    // redirect to home if already logged in
    //Revisar a donde lo redirecciono
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
    this.loading = true;
  }

  ngOnInit(): void {
    this.formLogin = this._formBuilder.group({
      correo: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
      cargo: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onFormSubmit(){
    this.loading = false;
    let newLogin = <User>Object.assign({}, this.formLogin.value);

    this.router.navigate(['../docente/listar-formularios']);


    /**
    this.authenticationService.login(newLogin).pipe(first()).subscribe(data =>{
      this.router.navigate([this.returnUrl]);
    },
      error => {
        this.error = error;
        console.log(this.error)
        this.loading = true;
      })**/
  }

}
