import { Module } from '@nestjs/common';
import { HelperModule } from 'src/helper/helper.module';

@Module({
    imports: [HelperModule],
})
export class DbModule { }
