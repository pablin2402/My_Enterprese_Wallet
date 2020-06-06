# Enterprise-wallet
## Customer Accounts
```
Custom Accounts	Accounts referring to a specific context of income / expenses, e.g.: Enterprise, Clients, and Savings.	1	- Create accounts with “Account Name” (e.g.: Savings)
- Register Incomes / Expenses into account.
- Modify Account Name.
- Disable deletes account if it contains registered income / expenses.
- Make transfers between different accounts (It must be handled as an expense for debit Account and as an income for credit account, and will belong to TRANSFER category (see incomes, expense and categories requirements).
- Reports by dates for EXPENSES (red) vs. INCOMES (green)
- Reports by dates and CATEGORIES for Expenses (red) vs. Incomes (green)

```
```

Incomes	Represents any type of incomes that a user wants to register.	1	- The user can register an income with: name, category, amount of Income.
- Users can modify and/or delete incomes
Expenses	Represents any type of expense that a user wants to register.	1	- The user can register an expense with: name, category, amount of Income.
- Users can modify and/or delete incomes
Incomes / Expenses categories	Represents a context for an income or expense	1	- Application should have default categories:
-- Income: Transfer / Other,
-- Expenses:  Transfer / Other
- You can create new categories with: name for Incomes / Expenses.
```

## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for production
```
npm run build
```
### Run your unit tests
```
npm run test:unit
```
### Run your end-to-end tests
```
npm run test:e2e
```
### Lints and fixes files
```
npm run lint
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
