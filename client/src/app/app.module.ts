import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PlayerComponent } from './components/player/player.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SongComponent } from './components/song/song.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { SecToHMSPipe } from './pipes/sec-to-hms.pipe';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PlayerComponent,
    HeaderComponent,
    SidebarComponent,
    SongComponent,
    SecToHMSPipe,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    YouTubePlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
