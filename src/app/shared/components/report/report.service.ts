import { Injectable } from '@angular/core';
import {HttpService} from '../../../core/http/httpservice.service';
import { Observable } from 'rxjs';
import { Report } from '../../models/Report';

@Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(private httpService: HttpService) {}

  createReport(report: Report): Observable<any> {
    return this.httpService.postRequest(`report/create?title=${report.title}
    &description=${report.description}&returned_amount=${report.returned_amount}
    &investment_id=${report.investment_id}&payment_type=${report.payment_type}`, {}, true);
  }

  updateReport(report: Report): Observable<any> {
    return this.httpService.postRequest(`report/update?title=${report.title}
    &description=${report.description}&returned_amount=${report.returned_amount}
    &investment_id=${report.investment_id}&payment_type=${report.payment_type}&report_id=${report.id}`, {}, true);
  }

  deleteReport(report: Report): Observable<any> {
    return this.httpService.postRequest(`report/delete?report_id=${report.id}`, {}, true);
  }

  exportToCsv(filename: string, rows: object[]) {
    if (!rows || !rows.length) {
      return;
    }
    const separator = ',';
    const keys = Object.keys(rows[0]);
    const csvContent =
      keys.join(separator) +
      '\n' +
      rows.map(row => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          cell = cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator);
      }).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
}
