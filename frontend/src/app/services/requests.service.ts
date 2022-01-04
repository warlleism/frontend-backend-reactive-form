import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private readonly API = `${environment.API}customers`

  constructor(private http: HttpClient) { }

  create(customer: any): Observable<any>{
    return this.http.post(this.API, customer)
  }

  Pesquisacep(valor: any) {

    const cep = valor.replace(/\D/g, '');

    if (cep !=="") {

        const validacep = /^[0-9]{8}$/;

        if(validacep.test(cep)){
          return this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
        }
      }

      return of({})

    }

    getEstados():Observable<any[]>{
      return this.http.get<any[]>('assets/estados/estados.json')
    }
}
