import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { SplitType } from './entities/expense.entity';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async addExpense(
    @Body('totalAmount') totalAmount: number,
    @Body('splitType') splitType: SplitType,
    @Body('participants') participants: number[],
    @Body('splits') splits: { [key: number]: number },
  ) {
    return this.expenseService.addExpense(
      totalAmount,
      splitType,
      participants,
      splits,
    );
  }

  @Get('user/:id')
  async getUserExpenses(@Param('id') id: number) {
    return this.expenseService.getUserExpenses(id);
  }

  @Get('overall')
  async getOverallExpenses() {
    return this.expenseService.getOverallExpenses();
  }
}
