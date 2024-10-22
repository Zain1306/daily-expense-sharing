import { Injectable, StreamableFile } from '@nestjs/common';
import { createWriteStream, createReadStream } from 'fs';
import { join } from 'path';
import { ExpenseService } from 'src/expense/expense.service';

@Injectable()
export class BalanceService {
  constructor(private readonly expenseService: ExpenseService) {}

  async generateBalanceSheet(): Promise<StreamableFile> {
    // Fetch all the expenses from the database
    const expenses = await this.expenseService.getAllExpenses(); // Assuming getAllExpenses returns all expense entities
    const filePath = join(__dirname, 'balance-sheet.csv');
    const csvStream = createWriteStream(filePath);

    // Write CSV header
    csvStream.write('User,Total Amount Owed\n');

    // Loop through each expense and its participants
    expenses.forEach((expense) => {
      expense.participants.forEach((participant) => {
        const amountOwed = expense.splits[participant.id]; // Accessing amount from the splits object
        csvStream.write(`${participant.name},${amountOwed}\n`);
      });
    });

    csvStream.end();

    return new StreamableFile(createReadStream(filePath));
  }
}
