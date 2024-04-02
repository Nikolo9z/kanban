import { Component } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormControl, FormsModule } from '@angular/forms';
import { ItemTarea } from '../clases/TareaItem';
import { CommonModule} from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, FormsModule,CommonModule,ModalComponent,MatDialogModule],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss',
})
export class ToDoListComponent {
  nombre = new FormControl();
  encargado = new FormControl();
  fechaInicio=new FormControl();
  fechaTermino=new FormControl();
  toDo: ItemTarea[] = [];
  Progress:ItemTarea[]=[];
  Done: ItemTarea[] = [];
  constructor(private dialog:MatDialog){}
  openDialogCustom(item: ItemTarea, list: ItemTarea[], listType: string) {
    const dialogRef = this.dialog.open(ModalComponent, {data:item});
    dialogRef.afterClosed().subscribe(res => {
      if (res) { 
        const index = list.indexOf(item);
        if (index !== -1) { 
          list[index] = res; 
          if (listType === 'todo') {
            this.toDo = [...list];
          } else if (listType === 'progress') {
            this.Progress = [...list];
          } else if (listType === 'done') {
            this.Done = [...list];
          }
        }
      }
    });
  }
  agregarToDo(){
    const dialogRef=this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.toDo.push(res);
      }
    });

  }
  deleteItem(item:ItemTarea,list: ItemTarea[]){
    const index = list.indexOf(item);
    if (index !== -1) {
      list.splice(index, 1);
    }
  }
  drop(event: CdkDragDrop<ItemTarea[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
