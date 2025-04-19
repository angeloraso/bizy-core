import { NgModule } from '@angular/core';
import { BizyAnimationService } from './animation.service';
import { BizyViewportService } from './viewport.service';
import { BizyKeyboardService } from './keyboard.service';
import { BizyExportToCSVService } from './export-to-csv.service';
import { BizyCacheService } from './cache.service';
import { BizyValidatorService } from './validator.service';
import { BizyStorageService } from './storage.service';
import { BizyLogService } from './log.service';
import { BizyRouterService } from './router.service';
import { BizyCopyToClipboardService } from './copy-to-clipboard.service';
import { BizyFormatSecondsService } from './format-seconds.service';
import { BizyDeviceService } from './device/device.service';

const SERVICES: Array<any> = [
  BizyAnimationService,
  BizyDeviceService,
  BizyCacheService,
  BizyCopyToClipboardService,
  BizyExportToCSVService,
  BizyFormatSecondsService,
  BizyKeyboardService,
  BizyLogService,
  BizyRouterService,
  BizyStorageService,
  BizyValidatorService,
  BizyViewportService
]

@NgModule({
  providers: SERVICES
})

export class BizyServicesModule {}
