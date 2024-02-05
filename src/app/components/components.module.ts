import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { WelcomeComponent } from "./welcome/welcome.component";
import { UserFormComponent } from "./user-form/user-form.component";
import { UserListComponent } from "./user-list/user-list.component";
import { RouterModule } from "@angular/router";

const components = [
  WelcomeComponent,
  UserFormComponent,
  UserListComponent
];

@NgModule({
  imports: [
    IonicModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    components
  ],
  exports: components,
  providers: [],
})
export class ComponentsModule { }
