import { Injectable } from '@nestjs/common';
import { Expense, SplitType } from './entities/expense.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense) private expenseRepository: Repository<Expense>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async addExpense(
    totalAmount: number,
    splitType: SplitType,
    participants: number[],
    splits: { [key: number]: number },
  ): Promise<Expense> {
    const users = await this.userRepository.findBy({
      id: In(participants),
    });
    const expense = this.expenseRepository.create({
      totalAmount,
      splitType,
      participants: users,
      splits,
    });
    return this.expenseRepository.save(expense);
  }

  async getUserExpenses(userId: number): Promise<Expense[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }
    return this.expenseRepository
      .createQueryBuilder('expense')
      .leftJoin('expense.participants', 'user')
      .where('user.id = :id', { id: userId })
      .getMany();
  }

  async getOverallExpenses(): Promise<number> {
    const expenses = await this.expenseRepository.find();
    return expenses.reduce((acc, expense) => acc + expense.totalAmount, 0);
  }

  async getAllExpenses(): Promise<Expense[]> {
    return this.expenseRepository.find({ relations: ['participants'] });
  }
}
