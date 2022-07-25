import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  //listens to login event on the login button
  onLogin(): void {
    let email: string = this.loginForm.controls['email'].value;
    let password: string = this.loginForm.controls['password'].value;

    //checks if the user entered details are proper
    if (this.validateInput(email, password)) {
      //calls the service to authenticate user
      let user: User | void = this.authService.authenticateUser(email, password);
      if (user) {
        //replace with redirection to home screen
        alert('Authenticated!');
      }
      else {
        //tell the user that he is not authenticated to proceed further
        alert('Not authenticated!');
      }
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
