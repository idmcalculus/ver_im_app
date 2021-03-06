import { Injectable } from '@angular/core';

interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  { name: 'chartjs', src: 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js' },
  { name: 'p-coded', src: '../../.././assets/js/pcoded.min.js' },
  { name: 'v-layout', src: '../../.././assets/js/vertical-layout.min.js' },
  { name: 'slimscroll', src: '../../.././assets/js/jquery.slimscroll.js' },
  { name: 'g-maps', src: '../../.././assets/js/gmaps.js' },
  { name: 'dash', src: '../../.././assets/js/dash.js' },
  { name: 'jquery', src: '../../.././assets/js/jquery-3.2.1.min.js' },
  { name: 'bootstrap', src: '../../.././assets/js/bootstrap.min.js' },
  { name: 'platform', src: 'https://apis.google.com/js/platform.js' },
  { name: 'data-table',src: 'https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js' },
  { name: 'flat-pickr', src: 'https://cdn.jsdelivr.net/npm/flatpickr' },
  { name: 'trigger-data-table', src: '../../.././assets/js/trigger-data-table.js' }


  



];

declare var document: any;

@Injectable()
export class DynamicScriptLoaderService {

  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadSingle(script: string) {
    return this.loadScript(script);
  }


  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (this.scripts[name] && !this.scripts[name].loaded) {
        //load script
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        if (script.readyState) {  //IE
            script.onreadystatechange = () => {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    // this.scripts[name].loaded = true;
                    resolve({script: name, loaded: true, status: 'Loaded'});
                }
            };
        } else {  //Others
            script.onload = () => {
                // this.scripts[name].loaded = true;
                resolve({script: name, loaded: true, status: 'Loaded'});
            };
        }
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }

}