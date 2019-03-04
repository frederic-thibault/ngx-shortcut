
# Shortcut Decorator for angular 7+

Add shortcuts on functions in your angular components.

Use the service to register shortcuts and unregister it (very important).

Use the directive to set focus on control with shortcut.

Managed in a stack, you can override shortcut in a child route controller or modal and continue to work when back in your parent route controller.

Give it a try!!

## Installation

`npm i ngx-shortcut`
 

## Basic setup import
```Typescript
import { ShortcutModule } from  'ngx-shortcut';

@NgModule({
    imports: [
        ShortcutModule.forRoot()
    ],
})

export  class  AppModule { }
```

## Usage
```Typescript
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Shortcut, ShortcutService } from 'ngx-shortcut';

@Component({
    template: `<input shortcutFocus [shortcutFocusCode]="'KeyA'" [shortcutFocusAlt]="true"  [shortcutFocusCtrl]="false"  [shortcutFocusShift]="false" type="text" autofocus
            placeholder="Autofocus alt+a" />`,
})
export class TestComponent implements OnInit, OnDestroy {
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
```