import { Directive, ElementRef, OnDestroy, OnInit, Input } from '@angular/core';
import { ShortcutService, ShortcutKey } from './shortcut.service';

@Directive({
	// tslint:disable-next-line:directive-selector
	selector: '[shortcutFocus]',
	exportAs: 'shortcutFocus'
})
export class ShortcutFocusDirective implements OnInit, OnDestroy {
	@Input() public shortcutFocus: ShortcutKey | null;
	@Input() public shortcutFocusCode: string;
	@Input() public shortcutFocusAlt: boolean;
	@Input() public shortcutFocusCtrl: boolean;
	@Input() public shortcutFocusShift: boolean;

	constructor(private el: ElementRef, private shortcutService: ShortcutService) {
	}

	public ngOnInit(): void {
		this.shortcutService.register(this.getKey(), () => {
			this.el.nativeElement.focus();
		});
	}

	public ngOnDestroy(): void {
		this.shortcutService.unregister(this.getKey());
	}

	private getKey(): ShortcutKey {
		let key = this.shortcutFocus;
		if (!key) {
			key = {
				code: this.shortcutFocusCode,
				altKey: this.shortcutFocusAlt,
				ctrlKey: this.shortcutFocusCtrl,
				shiftKey: this.shortcutFocusShift,
			};
		}

		return key;
	}
}
