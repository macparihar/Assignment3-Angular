import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'assets/users.json';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getAccessTokenByUsernameAndPassword(username: string, password: string): Observable<string> {
    return new Observable(observer => {
      this.getUsers().subscribe(users => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          observer.next(btoa(`${username}:${password}`)); // Simple base64 token
        } else {
          observer.error('Invalid credentials');
        }
        observer.complete();
      });
    });
  }
}
