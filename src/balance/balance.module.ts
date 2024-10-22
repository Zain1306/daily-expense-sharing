import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { Balance } from './entities/balance.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseService } from 'src/expense/expense.service';
import { Expense } from 'src/expense/entities/expense.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Balance,Expense, User])],
  controllers: [BalanceController],
  providers: [BalanceService, ExpenseService, UserService],
})
export class BalanceModule {}
