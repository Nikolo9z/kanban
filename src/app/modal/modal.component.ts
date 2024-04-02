import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemTarea } from '../clases/TareaItem';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {
  MatDatepickerModule,
} from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatDateFormats,
} from '@angular/material/core';
import {
  DateFnsAdapter,
  DateFnsModule,
} from '@angular/material-date-fns-adapter';
import { es } from 'date-fns/locale';
import { MatFormField } from '@angular/material/form-field';

export const DATE_FORMATS: MatDateFormats = {
  parse: { dateInput: 'dd-MM-yyyy' },
  display: {
    dateInput: 'dd-MM-yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'yyyy',
  },
};
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    DateFnsModule,
    MatFormField,
    MatInputModule
  ],
  providers: [
    { provide: DateAdapter, useClass: DateFnsAdapter },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: es },
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit {
  isUpdate: boolean=false;
  itemUpdate: ItemTarea;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ItemTarea) {
    if (data) {
      this.isUpdate = true;
      this.itemUpdate = {
        nombre: data.nombre,
        encargado: data.encargado,
        fechaInicio: data.fechaInicio,
        fechaTermino: data.fechaTermino,
      };
    } else {
      this.isUpdate = false;
      this.itemUpdate = {
        nombre: '',
        encargado: '',
        fechaInicio: new Date(),
        fechaTermino: new Date(),
      };
    }
  }
  ngOnInit(): void {
    if(this.data){
      this.isUpdate=true
    }
  }
}
