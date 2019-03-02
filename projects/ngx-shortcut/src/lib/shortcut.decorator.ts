import { ShortcutKey, ShortcutService } from './shortcut.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ShortcutFactory {
	static shortcutService: ShortcutService | undefined = undefined;
	constructor(service: ShortcutService) {
		ShortcutFactory.shortcutService = service;
	}
}

export function Shortcut(shortcutKey: ShortcutKey) {
	return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
		if (typeof target[propertyKey] !== 'function') {
			throw new Error('Shortcut decorator can only be use on function');
		}

		const constructor = target.constructor;

		const originalOnInit = constructor.prototype['ngOnInit'];
		constructor.prototype['ngOnInit'] = function (...args) {
			const shortcutService = ShortcutFactory.shortcutService;
			shortcutService.register(shortcutKey, () => {
				if (shortcutKey.args) {
					target[propertyKey].apply(this, [...shortcutKey.args]);
				} else {
					target[propertyKey].apply(this);
				}
			});

			if (originalOnInit) {
				originalOnInit.apply(this, args);
			}
		};

		const originalOnDestroy = constructor.prototype['ngOnDestroy'];
		constructor.prototype['ngOnDestroy'] = function (...args) {
			const shortcutService = ShortcutFactory.shortcutService;
			shortcutService.unregister(shortcutKey);
			if (originalOnDestroy) {
				originalOnDestroy.apply(this, args);
			}
		};

		return descriptor;
	};
}
