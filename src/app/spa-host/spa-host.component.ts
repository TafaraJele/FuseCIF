import { Component, OnInit, ViewChild, ElementRef, OnDestroy, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SingleSpaService } from '../../services/single-spa.service';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-spa-host',
  template: '<div #appContainer></div>',
  styles: [' app-spa-host{display: grid !important}'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpaHostComponent implements OnInit {
  data: { accessToken: string; user: any; };

  constructor(private singleSpaService: SingleSpaService, private route: ActivatedRoute) { }

  @ViewChild('appContainer', { static: true })
  appContainerRef: ElementRef;

  appName: string;

  ngOnInit() {
    this.appName = this.route.snapshot.data.app;
    this.data = {
      accessToken: environment.accessToken,
      user: environment.user
    }
    this.mount().subscribe();
  }

  mount(): Observable<unknown> {
    return this.singleSpaService.mount(this.appName, this.appContainerRef.nativeElement, this.data);
  }

  unmount(): Observable<unknown> {
    return this.singleSpaService.unmount(this.appName);
  }
}
