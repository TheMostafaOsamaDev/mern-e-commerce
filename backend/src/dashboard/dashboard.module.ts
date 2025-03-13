import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { ProductsModule } from './products/products.module';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  imports: [ProductsModule],
})
export class DashboardModule {}
