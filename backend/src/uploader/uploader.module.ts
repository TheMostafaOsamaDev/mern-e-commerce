import { Module } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { UploaderController } from './uploader.controller';
import { MulterModule } from '@nestjs/platform-express';
import { productImageStorage } from 'src/config/storage.config';
import { productImageProviders } from './entities/product-image.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    MulterModule.register({ storage: productImageStorage }),
  ],
  controllers: [UploaderController],
  providers: [UploaderService, ...productImageProviders],
})
export class UploaderModule {}
