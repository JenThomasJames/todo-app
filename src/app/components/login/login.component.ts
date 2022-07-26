import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  //listens to login event on the login button
  onLogin(): void {
    let email: string = this.loginForm.controls['email'].value;
    let password: string = this.loginForm.controls['password'].value;

    //checks if the user entered details are proper
    if (this.validateInput(email, password)) {
      //calls the service to authenticate user
      this.authService.authenticateUser(email, password).subscribe(data => {
        sessionStorage.setItem('userId', ''+data.userId);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('firstname', data.firstName);
        sessionStorage.setItem('lastname', data.lastName);

        //navigate to home
      }, error => {
        alert("Login Failed. Please try again");
      });
      
    }
    //user messed up something while giving the input
    else {
      alert('Invalid credentials. Please try again');
    }
  }

  //validates user input
  validateInput(email: string, password: string): boolean {
    //empty email
    if (email == '') {
      return false;
    }
    //validation for proper email format
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return false;
    }
    //empty password
    if (password == '') {
      return false;
    }

    //all validation successfull
    return true;
  }

}
