import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';

export interface ShortcutKey {
	code: string;
	ctrlKey?: boolean;
	shiftKey?: boolean;
	altKey?: boolean;
	args?: any[];
}

interface ShortcutKeyObserver {
	shortcut: ShortcutKey;
	observer: () => void;
}

@Injectable()
export class ShortcutService {
	private mappings: { [identifier: string]: ShortcutKeyObserver[] } = {};
	constructor() {
		fromEvent(document, 'keydown')
			.subscribe((event: KeyboardEvent) => {
				const identifier = this.shorcutKeyIdentifier(event);
				if (this.mappings[identifier]) {
					event.preventDefault();
					const mapping = this.mappings[identifier];
					mapping[mapping.length - 1].observer();
				}
			});
	}

	public register(shortcut: ShortcutKey, observer: () => void): void {
		const identifier = this.shorcutKeyIdentifier(shortcut);
		if (!this.mappings[identifier]) {
			this.mappings[identifier] = [];
		}

		this.mappings[identifier].push({
			shortcut: shortcut,
			observer: observer
		});
	}

	public unregister(shortcut: ShortcutKey): void {
		const identifier = this.shorcutKeyIdentifier(shortcut);
		if (this.mappings[identifier]) {
			let shortcutObserver = this.mappings[identifier].pop();
			delete shortcutObserver.observer;
			delete shortcutObserver.shortcut;
			shortcutObserver = null;
			if (this.mappings[identifier].length === 0) {
				delete this.mappings[identifier];
			}
		}
	}

	private shorcutKeyIdentifier(shortcutKey: ShortcutKey): string {
		return `code: ${shortcutKey.code} ctrl: ${shortcutKey.ctrlKey || false} shift: ${shortcutKey.shiftKey || false} alt ${shortcutKey.altKey || false}`;
	}
}
