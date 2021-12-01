import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { Todo } from 'src/todo';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
	constructor(private todosService: TodosService) { }

	@Get()
	getAll(): Todo[] {
		return this.todosService.getAll();
	}

	@Get(':id')
	getTodo(@Param('id') id: string): Todo {
		const todo = this.todosService.get(+id); // + converts string to number
		if (!todo) {
			throw new NotFoundException();
		}
		return todo;
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	add(@Body() todo: Todo): Todo {
		return this.todosService.add(todo);
	}

	@Put(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	update(@Body() todo: Todo, @Param('id') id: string): void {
		this.todosService.update(+id, todo);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	delete(@Param('id') id: string): void {
		this.todosService.delete(+id);
	}
}
