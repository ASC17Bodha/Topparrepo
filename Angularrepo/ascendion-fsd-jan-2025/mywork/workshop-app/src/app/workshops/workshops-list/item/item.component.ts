import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IWorkshop } from '../../models/IWorkshop';
import { DatePipe } from '@angular/common';
import { LocationPipe } from '../../../common/location.pipe';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil,faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [DatePipe,LocationPipe,RouterLink,FontAwesomeModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  icons = {
    faPencil,
    faTrash,
};
@Input()
workshop!:IWorkshop;

@Output()
delete = new EventEmitter();

onDeleteWorkshop() {
    this.delete.emit();
}

}
