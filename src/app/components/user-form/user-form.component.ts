import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { IUser } from 'src/app/interfaces/user.interfaces';
import { ToastService } from 'src/app/services/toast.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {

  formUser!: FormGroup;
  user!: IUser;

  constructor(
    private userService: UsersService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
  ) {
    this.builderUserNewForm();
  }

  saveUser() {
    if (this.formUser.valid || this.formUser.value('yearsOld').lenght >= 2) {
      this.userService.save(this.formUser.value).subscribe({
        next: (resp) => {
          this.toastService.show('success', 'Registro exitoso');
          this.formUser.reset();
        }, error: (erro) => {
          this.toastService.show('error', 'Usuario no guardado');
        }
      })
    }
  }

  private builderUserNewForm() {
    this.formUser = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      yearsOld: ['', [Validators.required]],
    });
  }

}
