import { Component } from '@angular/core';

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

@Component({
  selector: 'ngbd-table-overview-demo',
  template: `
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Country</th>
        <th scope="col">Area</th>
        <th scope="col">Population</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let country of countries; index as i">
        <th scope="row">{{ i + 1 }}</th>
        <td>
          <img [src]="'https://upload.wikimedia.org/wikipedia/commons/' + country.flag" class="mr-2" style="width: 20px">
          {{ country.name }}
        </td>
        <td>{{ country.area | number }}</td>
        <td>{{ country.population | number }}</td>
      </tr>
      </tbody>
    </table>
  `
})
export class NgbdTableOverviewDemo {

  countries: Country[] = [
    {
      name: 'Russia',
      flag: 'f/f3/Flag_of_Russia.svg',
      area: 17075200,
      population: 146989754
    },
    {
      name: 'Canada',
      flag: 'c/cf/Flag_of_Canada.svg',
      area: 9976140,
      population: 36624199
    },
    {
      name: 'United States',
      flag: 'a/a4/Flag_of_the_United_States.svg',
      area: 9629091,
      population: 324459463
    }
  ];
}
