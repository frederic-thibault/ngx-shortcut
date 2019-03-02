import { Component, OnDestroy, OnInit } from '@angular/core';
import { Shortcut, ShortcutService } from 'projects/ngx-shortcut';
@Component({
	selector: 'mat-ta-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
	title = 'ShortcutDecoratorLibrary';
	constructor(private shortcutService: ShortcutService) {
	}

	@Shortcut({ code: 'KeyR', altKey: true, ctrlKey: false, shiftKey: false })
	functionTest1() {
		console.log('Test alt+r');
	}

	@Shortcut({ code: 'KeyS', altKey: true, ctrlKey: false, shiftKey: false })
	@Shortcut({ code: 'KeyT', altKey: true })
	functionTest2() {
		console.log('Test alt+S or alt+T');
	}

	@Shortcut({ code: 'KeyU', altKey: true, ctrlKey: false, shiftKey: false, args: [1] })
	@Shortcut({ code: 'KeyV', altKey: true, args: [2] })
	functionTest3(param: number) {
		switch (param) {
			case 1:
				console.log('Test alt+U');
				break;
			case 2:
				console.log('Test alt+V');
				break;
		}
	}

	public ngOnInit(): void {
		this.shortcutService.register({ code: 'KeyP', ctrlKey: true }, () => {
			console.log('Test ctrl+p');
		});
	}

	public ngOnDestroy(): void {
		this.shortcutService.unregister({ code: 'KeyP', ctrlKey: true });
	}
}
