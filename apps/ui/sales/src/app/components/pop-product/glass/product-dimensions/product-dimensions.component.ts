import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-dimensions',
  templateUrl: './product-dimensions.component.html',
  styleUrls: ['./product-dimensions.component.scss'],
})
export class DimensionsComponent {
  dimensionsForm: FormGroup;
  dimensions: FormArray;
  titleAlert: string = 'Ce Champ Est Obligatoire';

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.dimensions = this.fb.array([
      this.fb.group({
        width: ['', Validators.required],
        heigth: ['', Validators.required],
        count: ['', Validators.required],
      }),
    ]);
    this.dimensionsForm = this.fb.group({
      dimensions: this.dimensions,
    });
  }
  createItem() {
    return this.fb.group({
      width: ['', Validators.required],
      heigth: ['', Validators.required],
      count: ['', Validators.required],
    });
  }
  addItem() {
    this.dimensions.push(this.createItem());
  }
  removeItem(i) {
    this.dimensions.removeAt(i);
  }
}
