import { Injectable } from '@angular/core';
import { IUser, IUserPagination } from '../interfaces/user.interfaces';
import { catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private urlApi = 'http://localhost:3000'

  constructor(
    private httpClient: HttpClient,
    private toastService: ToastService,
  ) { }

  getList(current: number, limit: number = 10) {
    return this.httpClient.get<IUserPagination>(`${this.urlApi}/users/page?current=${current}&limit=${limit}`)
    .pipe(
      catchError(error => {
        this.toastService.show('error', 'Error al obtener los usuarios');
        return throwError(error);
      })
    );
  }

  save(address: IUser) {
    return this.httpClient.post(`${this.urlApi}/users`, address).pipe(
      map((response: any) => response as IUser),
      catchError(error => {
          this.toastService.show('error', 'Error al guardar el usuario');
          return throwError(error);
      })
  );
  }
}
