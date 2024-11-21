import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.css'],
})
export class SimuladorComponent implements OnInit {
  loanAmount: number = 1000;
  loanTerm: number = 6;
  monthlyPayment: any = 0;
  scheduleData: any[] = [];

  ngOnInit() {
    this.updateMonthlyPayment();
  }

  updateMonthlyPayment() {
    const monthlyInterestRate = 0.01;
    const numerator =
      monthlyInterestRate * Math.pow(1 + monthlyInterestRate, this.loanTerm);
    const denominator = Math.pow(1 + monthlyInterestRate, this.loanTerm) - 1;
    this.monthlyPayment = (
      (this.loanAmount * monthlyInterestRate) /
      (1 - 1 / Math.pow(1 + monthlyInterestRate, this.loanTerm))
    ).toFixed(2);
  }

  generateSchedule() {
    const monthlyInterestRate = 0.01;
    this.scheduleData = [];

    let remainingBalance: any = this.loanAmount;
    for (let month = 1; month <= this.loanTerm; month++) {
      const interest: any = (remainingBalance * monthlyInterestRate).toFixed(2);
      const principal: any = (this.monthlyPayment - interest).toFixed(2);
      remainingBalance = (remainingBalance - principal).toFixed(2);

      const rowData = {
        month: month,
        date: this.getFutureDate(month),
        payment: this.monthlyPayment,
        interest: interest,
        principal: principal,
        remainingBalance: remainingBalance,
      };

      this.scheduleData.push(rowData);
    }
  }

  getFutureDate(monthsToAdd: number): string {
    const today = new Date();
    const futureDate = new Date(today.setMonth(today.getMonth() + monthsToAdd));
    return futureDate.toLocaleDateString('es-ES');
  }
}
