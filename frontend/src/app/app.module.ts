import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './customers/create/create.component';
import { RequestsService } from './services/requests.service';


@NgModule({
  declarations: [AppComponent, CreateComponent],
  imports: [BrowserModule, AppRoutingModule,FormsModule,HttpClientModule,ReactiveFormsModule],
  providers: [RequestsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
