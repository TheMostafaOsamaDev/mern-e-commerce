import {
  BadRequestException,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  imageFileFilter,
  productImageStorage,
} from 'src/config/storage.config';

@Controller('uploader')
export class UploaderController {
  constructor(private readonly uploadedService: UploaderService) {}

  @Post('product')
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      storage: productImageStorage,
      fileFilter: imageFileFilter,
    }),
  )
  async uploadProductImages(@UploadedFiles() files: Express.Multer.File[]) {
    const filenames = files.map((file) => ({ name: file.filename }));

    if (filenames.length === 0)
      throw new BadRequestException('You must upload at least 1 images');

    if (filenames.length > 5)
      throw new BadRequestException('You can only upload up to 5 images');

    const productImages =
      await this.uploadedService.createProductImage(filenames);

    return productImages;
  }
}
