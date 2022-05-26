import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  showAlert: boolean = false;
  alertColor: string = 'blue';
  alertMsg: string = 'Please wait! We are logging you in.';
  inSubmission: boolean = false;

  credentials = {
    email: '',
    password: '',
  };

  constructor(private auth: AngularFireAuth) {}

  ngOnInit(): void {}

  async login() {
    this.showAlert = true;
    this.alertMsg = 'Logging in. Please wait...';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password
      );
    } catch (error) {
      this.inSubmission = false;
      this.alertMsg = 'An unexpected error occurred. Please try again later.';
      this.alertColor = 'red';

      console.log(error);

      return;
    }
    this.alertMsg = 'Success! You are now logged in.';
    this.alertColor = 'green';
  }
}
