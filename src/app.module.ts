import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule} from '@nestjs/config';

@Module({
  imports: [ MongooseModule.forRoot(process.env.MONGODB_URI) , UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
