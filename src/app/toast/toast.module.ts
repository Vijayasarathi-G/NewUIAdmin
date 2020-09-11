import { NgModule, ModuleWithProviders } from '@angular/core';
import { ToastComponent } from './toast.component';
import { defaultToastConfig, TOAST_CONFIG_TOKEN } from './toast-config';

import {MatIconModule} from '@angular/material/icon';
import {OverlayModule} from '@angular/cdk/overlay';

@NgModule({
  imports: [OverlayModule, MatIconModule],
  declarations: [ToastComponent],
  entryComponents: [ToastComponent]
})
export class ToastModule {
  public static forRoot(config = defaultToastConfig): ModuleWithProviders {
        return {
            ngModule: ToastModule,
            providers: [
                {
                    provide: TOAST_CONFIG_TOKEN,
                    useValue: { ...defaultToastConfig, ...config },
                },
            ],
        };
    }
 }
