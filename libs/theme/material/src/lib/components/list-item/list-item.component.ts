import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList
} from '@angular/core';
import { GroupItems } from '../../interfaces/group-items';
import { TypeTemplateDirective } from '../../directives/type-template';


const MEDIA_COLS = ['cols', 'cols-sm', 'cols-md', 'cols-lg', 'cols-xl'];

@Component({
  selector: 'ngx-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements AfterContentInit, OnInit {
  @Input() data: Array<GroupItems>;
  @Input() gap = "50px";
  @Output() triggerEvent = new EventEmitter<{action: string, data?: any}>();

  @ContentChildren(TypeTemplateDirective)
  private typeTemplateDirectives: QueryList<TypeTemplateDirective>;
  private templates: any;

  constructor() {

  }

  ngOnInit(): void {
    this.setMedia();
    }

  /**
   * Set Flex Media Queries
   * support sm, md, lg, xl
    */
  setMedia() {
    function setOne(groupItem, index: number) {
      return groupItem[MEDIA_COLS[index]] || setOne(MEDIA_COLS[index - 1], index - 1);
    }
    this.data.forEach((groupItem) => {
      MEDIA_COLS.slice(1).forEach((item, index) => {
        if (!groupItem.hasOwnProperty(item)) groupItem[item] = setOne(groupItem, index);
      });
    });
  }

  ngAfterContentInit(): void {
    this.templates = {};
    this.typeTemplateDirectives.forEach(item => {
      this.templates[item.typeTemplate] = item.templateRef;
    });
  }
  triggerAction(action: string, data?) {
    this.triggerEvent.emit({
      action,
      data
    });
  }
}
