import { Component, OnInit, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent, IonInfiniteScroll } from '@ionic/angular';
import { IUser } from 'src/app/interfaces/user.interfaces';
import { ToastService } from 'src/app/services/toast.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent  implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  count = 1
  scrollDisabled = false

  users!: IUser[]
  totalItems!: number;
  totalPage!: number;
  currentPage: number = 1;
  limit: number = 15;

  constructor(
    private userService: UsersService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.getUserList(this.currentPage, this.limit);
  }

  getUserList(current: number, limit?: number) {
    this.userService.getList(current, limit).subscribe({
      next: (resp) => {

        if(this.users?.length > 0) {
          for(var i=0; i < resp.results.length; i++){
            this.users.push(resp.results[i]);
          }
        }else{
          this.users = resp.results;
          this.toastService.show('success', 'Usuarios obtenidos');
        }

        this.totalItems = resp.total;
        this.totalPage = resp.totalPages;
        this.currentPage = resp.current;

      }, error: (err) => {
        this.toastService.show('error', 'Error al obtener los usuarios');
      }
    })
  }

  loadData(event: any) {
    if((this.currentPage + 1) <= this.totalPage) {
      setTimeout(() => {
        event.target.complete();
        this.getUserList(this.currentPage + 1, 10)
        if (this.scrollDisabled) {
          event.target.disabled = true;
        }
      }, 500);
    }else {
      this.toggleInfiniteScroll()
      this.toastService.show('danger', 'Limite de usuarios');
    }
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}
