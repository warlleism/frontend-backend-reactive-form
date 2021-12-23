import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  formulario: FormGroup;

  estados: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private createService: RequestsService
  ) {}

  ngOnInit() {

    this.estados = this.createService.getEstados()



    this.formulario = this.formBuilder.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      cpf: [null, [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
      rg: [null, Validators.required],

      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        estado: [null, Validators.required],
        cidade: [null, Validators.required],
        bairro: [null, Validators.required],
        rua: [null, Validators.required],
        numero: [null, Validators.required],
      }),
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.createService.create(this.formulario.value).subscribe();
      alert('Cadastro feito com sucesso');
    } else {
      alert('Faltam Campos');
      this.validAllFields(this.formulario);
    }
  }

  validatorTouched(field: any) {
    return (
      this.formulario.get(field).touched && this.formulario.get(field).invalid
    );
  }

  validatorFields(field: any) {
    return {
      'is-invalid': this.validatorTouched(field),
    };
  }

  validAllFields(formGroup: FormGroup) {

    Object.keys(formGroup.controls).forEach((campo) => {

      const controle = formGroup.get(campo);
      controle.markAllAsTouched();

    });
  }

  consultaCEP() {
    const cep = this.formulario.get('endereco.cep').value;

    if (cep != null && cep != ' ') {
      this.createService.Pesquisacep(cep).subscribe((campos) => {
        this.popularDados(campos);
      });
    }
  }

  popularDados(dados: any) {
    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      },
    });
  }
}