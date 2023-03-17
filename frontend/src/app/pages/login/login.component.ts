import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { UserDTO } from "src/app/model/dto/user.dto";
import { AuthService } from "src/app/shared/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm?: FormGroup;
  areCredentialsCorrect = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {}

  get email(): string {
    return this.loginForm?.get('email')?.value;
  }

  get password(): string {
    return this.loginForm?.get('password')?.value;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    });
  }

  login(): void {
    const userDto = new UserDTO(
      this.email, this.password
    );
    this.authService.login(userDto).subscribe({
      next: () => {
        this.authService.authenticate();
      },
      error: () => {
        this.areCredentialsCorrect = false;
        console.log('Invalid email or password');
      }
    });
  }

}
