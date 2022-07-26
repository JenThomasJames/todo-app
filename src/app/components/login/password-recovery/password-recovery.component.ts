import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {

  otp: FormControl = new FormControl('');
  generatedOtp: number;
  isValid: boolean = false;
  recoveryForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.generateOtp();
  }

  //generates a new OTP to the console
  generateOtp() {
    this.generatedOtp = Math.floor(Math.random() * (10000 - 1000)) + 1000;
    console.warn('Your OTP for password recovery is:' + this.generatedOtp);
  }

  //verifies the otp on clicking the submit button
  onSubmit(): void {
    if (this.otp.value === '') {
      alert('Please enter the OTP. (Available in the console)');
      return;
    }
    if (this.otp.value == this.generatedOtp)
      this.isValid = true;
    else
      alert('Invalid OTP!');
  }

  //saves the new password
  onUpdate(): void {
    if (this.validate()) {
      let email: string = this.recoveryForm.controls['email'].value;
      let password: string = this.recoveryForm.controls['password'].value;
      this.authService.changePassword(email, password).subscribe(data => {
        alert("Password changed successfully. Please login with the new password.");
        this.router.navigate(['login']);
      }, error => {
        alert("Something went wrong.Please try again.");
      });
    }
  }

  //validates the user input
  validate(): boolean {

    //empty email
    if (this.recoveryForm.controls['email'].value === '') {
      alert('Please enter the email');
      return false;
    }

    //invalid email format
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.recoveryForm.controls['email'].value)) {
      alert('Please enter a valid email address!');
      return false;
    }
    //empty password
    if (this.recoveryForm.controls['password'].value == '') {
      alert('Please enter your password');
      return false;
    }

    //password length is less than 8
    if (this.recoveryForm.controls['password'].value < 8) {
      alert('Please enter a password with at least 8 charecters');
      return false;
    }

    //passwords don't match
    if (this.recoveryForm.controls['password'].value != this.recoveryForm.controls['confirmPassword'].value) {
      alert('Passwords don\'t match!');
      return false;
    }
    return true;
  }

}
