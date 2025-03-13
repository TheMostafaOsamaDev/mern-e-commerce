import { Controller } from '@nestjs/common';
import { UploaderService } from './uploader.service';

@Controller('uploaded')
export class UploaderController {
  constructor(private readonly uploadedService: UploaderService) {}
}
