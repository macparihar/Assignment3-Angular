import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly tokenKey = 'authToken';

  constructor(private userService: UserService) {}

  login(username: string, password: string): void {
    this.userService.getAccessTokenByUsernameAndPassword(username, password).subscribe(token => {
      localStorage.setItem(this.tokenKey, token);
    }, error => {
      console.error('Login failed', error);
    });
  }

  isInRole(role: string): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const decodedToken = atob(token).split(':');
      const userRole = decodedToken[1];
      return userRole === role;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.tokenKey) !== null;
  }
}
