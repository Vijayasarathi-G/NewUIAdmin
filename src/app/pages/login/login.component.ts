import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {TokenStorageService} from '../../_services/token-storage.service';
import {ToastService} from '../../toast';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
              private toastService: ToastService, private route: Router) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.toastService.show({text: 'Login Success',
        type: 'success'});
        this.route.navigate(['/dashboard']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.toastService.show({text: this.errorMessage,
          type: 'success'});
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
