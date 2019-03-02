import { ModuleWithProviders, NgModule } from '@angular/core';
import { ShortcutFocusDirective } from './shortcut-focus.directive';
import { ShortcutFactory } from './shortcut.decorator';
import { ShortcutService } from './shortcut.service';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [CommonModule],
	declarations: [ShortcutFocusDirective],
	exports: [ShortcutFocusDirective]
})
export class ShortcutModule {
	constructor(shortcutFactory: ShortcutFactory) {
	}

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: ShortcutModule,
			providers: [
				ShortcutFactory,
				ShortcutService
			]
		};
	}
}
