import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from './app.service';
import { TagModule } from './tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import  ormconfig from '@app/ormconfig';
import { UserModule } from './user/user.module';
import { AuthMidleware } from './user/midlewares/auth.midleware';
import { APP_GUARD } from '@nestjs/core';
import { ArticleModule } from './article/article.module';
import { ProfileModule } from './user/profile/profile.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), TagModule, UserModule, ArticleModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMidleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }
}
