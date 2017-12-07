import {Route} from '@angular/router';
import {TenminStatComponent} from './tenmin-stat/tenmin-stat.component';
import {StatComponent} from './stat/stat.component';
import {LiveStrokesComponent} from './live-strokes/live-strokes.component';
import {SettingsComponent} from './settings/settings.component';
import {LiveMainComponent} from './live-main/live-main.component';
/**
 * Created by ehog on 2017. 04. 14..
 */

// pairs of path/component.
export const routes: Route[] = [
  {path: 'stat/tenmin', component: TenminStatComponent},
  {path: 'stat/:type', component: StatComponent},
  {path: 'live', component: LiveStrokesComponent},
  {path: 'live-main', component: LiveMainComponent},
  {path: 'settings', component: SettingsComponent},
  {path: '**', redirectTo: 'live'},
];
