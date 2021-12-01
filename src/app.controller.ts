import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('greet')
export class AppController {
	constructor(private readonly appService: AppService) { }

	@Get(':name')
	getHello(@Param('name') name): string {
		return `Hello ${name}!`;
	}
}
