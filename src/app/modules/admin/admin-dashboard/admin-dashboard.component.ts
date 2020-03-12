// @ts-nocheck
import { NgModule, Component, OnInit, ElementRef, Inject, ViewChild } from '@angular/core';
import {AdminService} from '../admin.service';
import { AdminDashboard } from 'src/app/shared/models/AdminDashboard';
import { CareerService } from '../../career/career.service';
import { ChartType, ChartOptions  } from 'chart.js';

import { Label, PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';
declare var google: any;

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  dashBoardData: AdminDashboard;

  careers: [];
  isLoading = true;

  public doughnutChartLabels: Label[] = ['Agriculture', 'Real Estate', 'Transprtation', 'Others'];
  public doughnutChartData = [[350, 450, 100, 200]];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: (ChartOptions) = {
    responsive: true,
    cutoutPercentage: 60,

    legendCallback(chart) {
      updateDatasets: () => { };
      const text = [];
      text.push('<ul style="width: 80%">');
      for (let i = 0; i < chart.data.datasets[0].data.length; i++) {
            text.push('<li style="display: flex;justify-content: space-between;font-size: 0.7rem;padding: 6% 0%;" class="data">');
            text.push('<div style="display: flex;justify-content: space-between">');
            text.push('<span style="border: 2.5px solid ' + chart.data.datasets[0].backgroundColor[i] + ';border-radius: 60%;width: 14px;height:14px;margin: 1px 2px;"></span>');
            if (chart.data.labels[i]) {
                text.push(chart.data.labels[i]);
            }
            text.push('</div>');
            text.push('<span style="color:#bcbdc2" class="label-sub">' + chart.data.datasets[0].data[i] + ' investments </span>');
            text.push('</li>');
        }
      text.push('</ul>');
      return text.join('');
    },
    legend: {
      display: false
    }
  };
  public doughnutChartPlugins: PluginServiceGlobalRegistrationAndOptions[] = [{
    afterDraw(chart: any) {
      const ctx = chart.ctx;
      let txt1 = 'Total Investments';
      let txt2 = '';

      try {
        const check = chart.active ? chart.tooltip._active[0]._datasetIndex : 'None'; // @ts-ignore
        if (check !== 'None') {
        txt2 = chart.tooltip._data.datasets[0].data[chart.tooltip._active[0]._index]; // @ts-ignore
        txt1 = `${chart.tooltip._data.labels[chart.tooltip._active[0]._index]} Investments`; // @ts-ignore
        } else {
          txt2 = '1000';
        }
      } catch (err) {
        txt2 = '1000';
      }
      // Get options from the center object in options
      const sidePadding = 60;
      const sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2); // @ts-ignore

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2); // @ts-ignore
      const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2); // @ts-ignore

      // Get the width of the string and also the width of the element minus 10 to give it 5px side padding

      const stringWidth = ctx.measureText(txt1).width;
      const elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated; // @ts-ignore

      // Find out how much the font can grow in width.
      const widthRatio = elementWidth / stringWidth;
      const newFontSize = Math.floor(30 * widthRatio);
      const elementHeight = (chart.innerRadius * 2); // @ts-ignore

      // Pick a new font size so it will not be larger than the height of label.
      const fontSizeToUse = 15;
      ctx.font = fontSizeToUse + 'px Arial';
      ctx.fillStyle = '#797a84';

      // Draw text in center
      ctx.fillText(txt2, centerX, centerY - 10);
      const fontSizeToUse1 = 11;
      ctx.font = fontSizeToUse1 + 'px Arial';
      ctx.fillText(txt1, centerX, centerY + 10);
      document.getElementById('legend').innerHTML = chart.generateLegend();

    }
  }];

  constructor(
    private adminService: AdminService,
    private careerService: CareerService) { }
    @ViewChild('mycanvas')
    canvas: ElementRef;
  ngOnInit() {
    google.charts.load('current',
    {packages: ['corechart'],
    mapsApiKey: 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
    });
    google.charts.setOnLoadCallback(drawRegionsMap);

    function drawRegionsMap() {
      const data = google.visualization.arrayToDataTable([
        ['Country', 'Popularity'],
        ['Nigeria', 700],
      ]);

      const options = {
          legend: 'none'
      };

      const chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

      chart.draw(data, options);
    }


    this.adminService.getDashBoardData().subscribe(resp => {
        if (resp && resp.success) {
          this.dashBoardData = resp.success.Data;
          this.isLoading = false;
        }
      });

  }



    updateDataset = function(e, datasetIndex) {
      const index = datasetIndex;
      const ci = e.view.myGlobalProfiles;
      const meta = ci.getDatasetMeta(index);

      // See controller.isDatasetVisible comment
      meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;

      // We hid a dataset ... rerender the chart
      ci.update();
    };
}
