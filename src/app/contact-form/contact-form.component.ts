import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

interface IContato {
  nome: string;
  email: string;
  telefone: string;
  assunto: string;
  mensagem: string;
}

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements IContato {
  nome: string = '';
  email: string = '';
  telefone: string = '';
  assunto: string = '';
  mensagem: string = '';

  @Output() submitEvent = new EventEmitter<void>();

  contactForm: FormGroup;
  mensagemEnviada: boolean = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      nome:     ['', [Validators.required, Validators.minLength(10)]],
      email:    ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.minLength(10)]],
      assunto:  ['', [Validators.required, Validators.minLength(10)]],
      mensagem: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  submitForm() {
    let msg = (this.contactForm.valid) 
            ? `Oi ${this.nome}, obrigado pela mensagem!`
            : 'Favor preenher o formulário corretamente.';

    localStorage.setItem('message', msg);
    this.submitEvent.emit();

    this.mensagemEnviada = true;
    this.contactForm.reset(); // Limpa o formulário após o envio
  }
}