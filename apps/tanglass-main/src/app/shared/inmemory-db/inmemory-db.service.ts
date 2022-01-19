import { InMemoryDbService } from 'angular-in-memory-web-api';
import { InvoiceDB } from './invoices';
import { Todo, TodoTag } from './todo';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return {
      'invoices': InvoiceDB.invoices,
      'todoList': Todo.todoList,
      'todoTag': TodoTag.tag
    }
  }
}
