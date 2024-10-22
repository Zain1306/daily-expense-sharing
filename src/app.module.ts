import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ExpenseModule } from './expense/expense.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from '../http.logger.ts/http.logger';
import { CorsMiddleware } from 'cors.middleware';
import { User } from './user/entities/user.entity';
import { Expense } from './expense/entities/expense.entity';
import { BalanceModule } from './balance/balance.module';
import { Balance } from './balance/entities/balance.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'zain13',
      database: 'daily-expense-sharing',
      entities: [User, Expense, Balance ],
      synchronize: true,
    }),
    UserModule,
    ExpenseModule,
    BalanceModule,
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
