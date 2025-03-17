import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { productImageStorage } from 'src/config/storage.config';

@Controller('uploader')
export class UploaderController {
  constructor(private readonly uploadedService: UploaderService) {}

  @Post('product')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: productImageStorage,
    }),
  )
  async uploadProductImages(@UploadedFiles() files: Express.Multer.File[]) {
    const filenames = files.map((file) => ({ name: file.filename }));

    const productImages =
      await this.uploadedService.createProductImage(filenames);

    return productImages;
  }
}
