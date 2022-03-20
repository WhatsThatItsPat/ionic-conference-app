import {
  Component,
  // ElementRef,
  // Inject,
  // ViewChild,
  // AfterViewInit
} from '@angular/core';
// import { ConferenceData } from '../../providers/conference-data';
// import { Platform } from '@ionic/angular';
// import { DOCUMENT} from '@angular/common';

// import { darkStyle } from './map-dark-style';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styleUrls: ['./map.scss']
})
export class MapPage {
  page = 'map';
  // @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;

  constructor(
    // @Inject(DOCUMENT) private doc: Document,
    // public confData: ConferenceData,
    // public platform: Platform
  ) {}

  ngOnInit() {
    console.log(`ngOnInit ${this.page}`);
  }

  ionViewWillEnter() {
    console.log(`ionViewWillEnter ${this.page}`);
  }

  ionViewDidEnter() {
    console.log(`ionViewDidEnter ${this.page}`);
  }

  ionViewWillLeave() {
    console.log(`ionViewWillLeave ${this.page}`);
  }

  ionViewDidLeave() {
    console.log(`ionViewDidLeave ${this.page}`);
  }

  // async ngAfterViewInit() {
  //   const appEl = this.doc.querySelector('ion-app');
  //   let isDark = false;
  //   let style = [];
  //   if (appEl.classList.contains('dark-theme')) {
  //     style = darkStyle;
  //   }

  //   const googleMaps = await getGoogleMaps(
  //     'YOUR_API_KEY_HERE'
  //   );

  //   let map;

  //   this.confData.getMap().subscribe((mapData: any) => {
  //     const mapEle = this.mapElement.nativeElement;

  //     map = new googleMaps.Map(mapEle, {
  //       center: mapData.find((d: any) => d.center),
  //       zoom: 16,
  //       styles: style
  //     });

  //     mapData.forEach((markerData: any) => {
  //       const infoWindow = new googleMaps.InfoWindow({
  //         content: `<h5>${markerData.name}</h5>`
  //       });

  //       const marker = new googleMaps.Marker({
  //         position: markerData,
  //         map,
  //         title: markerData.name
  //       });

  //       marker.addListener('click', () => {
  //         infoWindow.open(map, marker);
  //       });
  //     });

  //     googleMaps.event.addListenerOnce(map, 'idle', () => {
  //       mapEle.classList.add('show-map');
  //     });
  //   });

  //   const observer = new MutationObserver((mutations) => {
  //     mutations.forEach((mutation) => {
  //       if (mutation.attributeName === 'class') {
  //         const el = mutation.target as HTMLElement;
  //         isDark = el.classList.contains('dark-theme');
  //         if (map && isDark) {
  //           map.setOptions({styles: darkStyle});
  //         } else if (map) {
  //           map.setOptions({styles: []});
  //         }
  //       }
  //     });
  //   });
  //   observer.observe(appEl, {
  //     attributes: true
  //   });
  // }
}


/**
 * Interesting...declaring a function outside of the component export.
 * Can't use `this`. I guess this is organizational? An alternative to
 * having a service?
 */
function getGoogleMaps(apiKey: string): Promise<any> {
  const win = window as any;
  const googleModule = win.google;
  if (googleModule && googleModule.maps) {
    return Promise.resolve(googleModule.maps);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.31`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      const googleModule2 = win.google;
      if (googleModule2 && googleModule2.maps) {
        resolve(googleModule2.maps);
      } else {
        reject('google maps not available');
      }
    };
  });
}

