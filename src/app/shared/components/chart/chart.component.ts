import { Component, OnInit,ViewChild, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
// import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input()
  public lineChartData: ChartDataSets[] = []
  @Input()
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {}
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      // backgroundColor: 'rgba(77,83,96,0.2)',
      // borderColor: 'rgba(77,83,96,1)',
      // pointBackgroundColor: 'rgba(77,83,96,1)',
      // pointBorderColor: '#fff',
      // pointHoverBackgroundColor: '#fff',
      // pointHoverBorderColor: 'rgba(77,83,96,1)'

      backgroundColor: 'rgba(0, 255, 0, 0.3)',
      borderColor: 'green',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // red
      // backgroundColor: 'rgba(255,0,0,0.3)',
      // borderColor: 'red',
      // pointBackgroundColor: 'rgba(148,159,177,1)',
      // pointBorderColor: '#fff',
      // pointHoverBackgroundColor: '#fff',
      // pointHoverBorderColor: 'rgba(148,159,177,0.8)'

      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  @ViewChild(BaseChartDirective) chart: BaseChartDirective

  constructor() { }

  ngOnInit() {
  }

}
