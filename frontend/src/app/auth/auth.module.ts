import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthService } from "./auth.service";

@NgModule({
    declarations:[
        AuthComponent
    ],
    imports: [
       ReactiveFormsModule,
       CommonModule
    ],
    providers:[AuthService]

})
export class AuthModule{}

