import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  saveUserId(id: number): void {
    localStorage.setItem('id', id.toString());
  }
}
