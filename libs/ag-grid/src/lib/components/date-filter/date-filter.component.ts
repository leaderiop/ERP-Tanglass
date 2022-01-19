import { Component, Inject, OnInit } from '@angular/core';

import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';

// FP variation:
import addMonths from 'date-fns/fp/addMonths';
import { fr } from 'date-fns/locale';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { addWeeks, addYears, endOfWeek, startOfWeek } from 'date-fns/fp';
import { dateType } from '../../interfaces/date';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'ngx-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
})
export class DateFilterComponent implements OnInit {
  months: Array<string> = [];
  weeks;
  date = moment();

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    for (let i = 0; i < 12; i++) {
      this.months.push(fr.localize.month(i, { width: 'abbreviated' }));
    }
    this.weeks = Array(52)
      .fill(0)
      .map((x, i) => i + 1);
  }

  ngOnInit(): void {}

  closePopup(data?: dateType) {
    this.dialogRef.close(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async fetchMonth(year, month) {
    const dateStart = new Date(year, month);
    const dateEnd = addMonths(1, dateStart);
    this.closePopup({ dateStart, dateEnd, dateText: `${year} ${this.months[month]}` });
  }

  async fetchTrimester(year, trimester) {
    const dateStart = new Date(year, (trimester-1)*3);
    const dateEnd = addMonths(3, dateStart);
    this.closePopup({ dateStart, dateEnd, dateText: `${year} Trimestre ${trimester}` });
  }

  async fetchYear(year) {
    const dateStart = new Date(year);
    const dateEnd = addYears(1, dateStart);
    this.closePopup({ dateStart, dateEnd, dateText: year });
  }

  async fetchWeek(year, week) {
    const dateStart = startOfWeek(addWeeks(week-1,new Date(year)));
    const dateEnd = endOfWeek(dateStart);
    this.closePopup({ dateStart, dateEnd, dateText: `${year}, Semaine ${week}` });
  }
}
