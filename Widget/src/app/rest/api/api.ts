export * from './accounts.service';
import { AccountsService } from './accounts.service';
export * from './parentCategory.service';
import { ParentCategoryService } from './parentCategory.service';
export * from './transactions.service';
import { TransactionsService } from './transactions.service';
export const APIS = [AccountsService, ParentCategoryService, TransactionsService];
