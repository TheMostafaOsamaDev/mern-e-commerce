import { Module } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { UploaderController } from './uploader.controller';
import { MulterModule } from '@nestjs/platform-express';
import { productImageStorage } from 'src/config/storage.config';

@Module({
  imports: [MulterModule.register({ storage: productImageStorage })],
  controllers: [UploaderController],
  providers: [UploaderService],
})
export class UploaderModule {}
