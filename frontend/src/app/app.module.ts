import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './customers/create/create.component';
import { DeleteComponent } from './customers/delete/delete.component';
import { ReadComponent } from './customers/read/read.component';
import { UpdateComponent } from './customers/update/update.component';
import { RequestsService } from './services/requests.service';


@NgModule({
  declarations: [AppComponent, CreateComponent,ReadComponent,UpdateComponent,DeleteComponent],
  imports: [BrowserModule, AppRoutingModule,FormsModule,HttpClientModule,ReactiveFormsModule],
  providers: [RequestsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
