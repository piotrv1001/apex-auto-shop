import { BASE_URL } from './../../app.constants';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, Subject } from "rxjs";
import { UserDTO } from "src/app/model/dto/user.dto";
import { User } from 'src/app/model/entities/user.model';

type JwtToken = {
  jwt_token: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ROUTE = 'users';
  isAuthSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getAuthObs(): Observable<boolean> {
    return this.isAuthSubject.asObservable();
  }

  authenticate(): void {
    this.isAuthSubject.next(true);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  register(userDTO: UserDTO): Observable<User> {
    return this.http.post<User>(`${BASE_URL}/${this.ROUTE}`, userDTO);
  }

  login(userDTO: UserDTO): Observable<void> {
    return this.http.post<JwtToken>(`${BASE_URL}/auth`, userDTO)
      .pipe(map(response => this.authenticateSuccess(response)));
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      localStorage.removeItem('token');
      observer.complete();
    });
  }

  private authenticateSuccess(response: JwtToken): void {
    const jwt = response.jwt_token;
    localStorage.setItem('token', jwt);
  }
}
