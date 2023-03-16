import { BASE_URL } from './../../app.constants';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserDTO } from "src/app/model/dto/user.dto";
import { User } from 'src/app/model/entities/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ROUTE = 'users';

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== undefined;
  }

  register(userDTO: UserDTO): Observable<User> {
    return this.http.post<User>(`${BASE_URL}/${this.ROUTE}`, userDTO);
  }

  login() {

  }

  logout(): Observable<void> {
    return new Observable(observer => {
      localStorage.removeItem('token');
      observer.complete();
    });
  }
}
