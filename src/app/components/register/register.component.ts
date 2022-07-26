import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),

  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onRegister(): void {
    let user: User = {
      firstName: this.registerForm.controls['firstname'].value,
      lastName: this.registerForm.controls['lastname'].value,
      email: this.registerForm.controls['email'].value,
      password: this.registerForm.controls['password'].value
    };
    if (this.validate(user, this.registerForm.controls['confirmPassword'].value)) {
      this.authService.addNewUser(user).subscribe(data => {
        alert('Please login to continue.');
        this.router.navigate(['login']);
      }, error => {
        alert('Something went wrong. Please try again');
      });
    }

  }

  validate(user: User, confirmPassword: string): boolean {

    //empty firstname
    if (user.firstName == '') {
      alert('Please enter your firstname');
      return false;
    }

    //empty lastname
    if (user.lastName == '') {
      alert('Please enter your lastname');
      return false;
    }

    //empty email
    if (user.email == '') {
      alert('Please enter your email');
      return false;
    }
    //validation for proper email format
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) {
      alert('Please enter a valid email');
      return false;
    }
    //empty password
    if (user.password == '') {
      alert('Please enter your password');
      return false;
    }

    //password length is less than 8
    if (user.password.length < 8) {
      alert('Please enter a password with at least 8 charecters');
      return false;
    }

    //passwords don't match
    if (user.password !== confirmPassword) {
      alert('Passwords don\'t match. Try again');
      return false;
    }

    //all validation successfull
    return true;
  }
}
