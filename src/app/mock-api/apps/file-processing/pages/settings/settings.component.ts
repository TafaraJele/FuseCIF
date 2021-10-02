import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  panels: any[] = [];
  selectedPanel: string = 'cif';
  private _unsubscribeAll: Subject<any> = new Subject<any>();


  constructor() { }

  ngOnInit(): void {

    this.panels = [
      {
        id: 'cif',
        icon: 'heroicons_outline:server',
        title: 'Application',
        description: 'Manage general application settings'
      },
      {
        id: 'payment-file',
        icon: 'heroicons_outline:document-text',
        title: 'NI Payment Files',
        description: 'Manage NI payment files'
      },
      {
        id: 'amlock',
        icon: 'heroicons_outline:globe-alt',
        title: 'Amlock',
        description: 'Manage amlock settings'
      },
      {
        id: 'fimi',
        icon: 'heroicons_outline:cash',
        title: 'FIMI',
        description: 'Manage FIMI settings'
      },
      {
        id: 'flexcube',
        icon: 'heroicons_outline:cube',
        title: 'Flexcube',
        description: 'Manage Flexcube settings'
      },
      
    ];
  }
  getPanelInfo(id: string): any
    {
        return this.panels.find(panel => panel.id === id);
    }
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
    goToPanel(panel: string): void
    {
        this.selectedPanel = panel;

        // Close the drawer on 'over' mode
        if ( this.drawerMode === 'over' )
        {
            this.drawer.close();
        }
    }
}


