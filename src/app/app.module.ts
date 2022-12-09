import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObMasterLayoutModule, ObButtonModule, ObIconModule, multiTranslateLoader, ObHttpApiInterceptor, OB_BANNER, ObExternalLinkModule } from '@oblique/oblique';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeDECH from '@angular/common/locales/de-CH';
import localeFRCH from '@angular/common/locales/fr-CH';
import localeITCH from '@angular/common/locales/it-CH';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { UploadComponent } from './upload/upload.component';

registerLocaleData(localeDECH);
registerLocaleData(localeFRCH);
registerLocaleData(localeITCH);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ObMasterLayoutModule,
    BrowserAnimationsModule,
    ObButtonModule, // add other Oblique modules as needed
    ObIconModule.forRoot(), HttpClientModule, TranslateModule.forRoot(multiTranslateLoader()), MatButtonModule, MatCardModule, MatIconModule, ObExternalLinkModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'de-CH'},
    {provide: HTTP_INTERCEPTORS, useClass: ObHttpApiInterceptor, multi: true},
    {provide: OB_BANNER, useValue: environment.banner}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
