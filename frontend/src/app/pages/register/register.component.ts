import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { switchMap } from "rxjs";
import { UserDTO } from "src/app/model/dto/user.dto";
import { AuthService } from "src/app/shared/auth/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  @Output() loginBtnClick: EventEmitter<void> = new EventEmitter<void>();
  registerForm?: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService) {}

    get username(): string {
      return this.registerForm?.get('username')?.value;
    }

    get password(): string {
      return this.registerForm?.get('password')?.value;
    }

    ngOnInit(): void {
      this.registerForm = this.fb.group({
        username: '',
        password: ''
      });
    }

    register(): void {
      const userDto = new UserDTO(
        this.username, this.password
      );
      this.authService.register(userDto).pipe(
        switchMap(() => this.authService.login(userDto))
      ).subscribe({
        next: () => {
          this.authService.authenticate();
        },
        error: (error) => {
          console.log(error);
        }
      })
    }

    loginBtnClicked(): void {
      this.loginBtnClick.emit();
    }

}
