import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  getUserId(): string | null {
    return localStorage.getItem('id');
  }

  saveUserId(id: number): void {
    localStorage.setItem('id', id.toString());
  }
}
