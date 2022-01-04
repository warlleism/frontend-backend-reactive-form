import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit, OnDestroy {

  formulario: FormGroup;

  formClean: Subscription;

  estados: Observable<any[]>;

  showItensA: boolean = true;

  showItensB: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private createService: RequestsService
  ) {}

  showCampo() {
    return (this.showItensA = false), (this.showItensB = true);
  }
  showCampo2() {
    return (this.showItensA = true), (this.showItensB = false);
  }

  ngOnInit() {
    this.estados = this.createService.getEstados();

    this.formulario = this.formBuilder.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      sexo: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      cpf: [
        null,
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
        ],
      ],
      telefone: [null, Validators.required],
      celular: [null, Validators.required],
      rg: [null, Validators.required],
      nascimento: [null, Validators.required],

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
      this.formClean = this.createService
        .create(this.formulario.value)
        .subscribe();
      alert('Cadastro feito com sucesso');
    } else {
      alert('Campos Incompletos');
      this.validAllFields(this.formulario);
    }
  }

  ngOnDestroy(): void {
    this.formClean.unsubscribe();
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
        estado: dados.uf,
      },
    });
  }
}
