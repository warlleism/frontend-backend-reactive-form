import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  url = 'http://localhost:3001/customers'

  constructor(private http: HttpClient) { }

  create(customer: any): Observable<any>{
    return this.http.post(this.url, customer)
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

    getEstados():Observable<any>{
      return this.http.get<any>('assets/estados/estados.json')
    }
}
