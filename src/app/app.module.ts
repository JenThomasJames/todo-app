import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrandButtonComponent } from './components/shared/brand-button/brand-button.component';
import { BrandButtonOutlineComponent } from './components/shared/brand-button-outline/brand-button-outline.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PanelComponent } from './components/home/panel/panel.component';
import { PasswordRecoveryComponent } from './components/login/password-recovery/password-recovery.component';
import { TodoComponent } from './components/home/todo/todo.component';
import { CreateTodoComponent } from './components/home/todo/create-todo/create-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BrandButtonComponent,
    BrandButtonOutlineComponent,
    RegisterComponent,
    HomeComponent,
    PanelComponent,
    PasswordRecoveryComponent,
    TodoComponent,
    CreateTodoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
