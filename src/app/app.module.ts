import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ShortcutModule } from 'ngx-shortcut';
import { AppComponent } from './app.component';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ShortcutModule.forRoot()
	],
	declarations: [
		AppComponent
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
