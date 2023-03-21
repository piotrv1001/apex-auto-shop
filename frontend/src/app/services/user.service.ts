import { Subject } from 'rxjs';
import { BASE_URL } from './../app.constants';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../model/entities/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  USER_ROUTE = 'users';
  userSub: Subject<User> = new Subject<User>();

  constructor(private http: HttpClient) {}

  getUserObs(): Observable<User> {
    return this.userSub.asObservable();
  }

  notifyAboutUser(user: User): void {
    this.userSub.next(user);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get(`${BASE_URL}/${this.USER_ROUTE}/${id}`);
  }

  partialUpdate(user: User): Observable<User> {
    return this.http.patch<User>(`${BASE_URL}/${this.USER_ROUTE}`, user);
  }

}
