import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { Response } from 'express';


@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get('download')
  async downloadBalanceSheet(@Res() res: Response) {
    const file = await this.balanceService.generateBalanceSheet();

    // Set the headers correctly using 'setHeader'
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="balance-sheet.csv"',
    );

    // Use file stream to pipe the CSV file to the response
    file.getStream().pipe(res);
  }
}
