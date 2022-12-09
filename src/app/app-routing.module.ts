import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObUnknownRouteModule } from '@oblique/oblique';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [{ path: '', redirectTo: 'upload', pathMatch: 'full' }, { path: 'home', component: HomeComponent }, { path: 'upload', component: UploadComponent }, { path: '**', redirectTo: 'unknown-route' }];

@NgModule({
  imports: [RouterModule.forRoot(routes), ObUnknownRouteModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
