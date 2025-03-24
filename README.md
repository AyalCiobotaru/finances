# Cheabs Personal Finances

## Requirements

1. Angular 14
1. Java 8+ (Probably should upgrade this)
1. NPM
1. Docker
1. MySQL Shell CLI

## DB

### Entities
- Transaction
- Account
- Parent-Category

### Relationships
- One Parent-Category to many Accounts
- 2 separate One to One relationships with Join_Tables for Account -> Transaction
    - Each Transaction has two accounts, a Debited Account and a Credited Account

## How to Run
- Boot up a MySql server using ```docker-compose up``` which will boot up the latest mySql Server with password = ```password```.
- Bootrun the server to create the tables in the db using ```./gradlew bootrun```.
- Log into the server using the MySQL CLI from the ```Accounts``` directory.
    - ```mysql -u root -p --port=6605```
    - When prompted for password enter ```password```.
- Run ```source compilation.sql;``` which will create the accounts in the Account table. This also adds rollovers from previous years for actual accounts.
- That will give the basic structure for the backend.
- In the ```Widget``` directory, run ```npm i```.
- Once that's finished, ```ng serve``` will start the app on ```localhost:4200```.
- I've been using the transactions from my finance sheet to load in and mess around with different features.

## Tags

### v1-mvp

This is the minimum viable product, it includes the following features:
1. CRUD for Transactions
1. Summary sheet that automatically gets updated
1. Filter account in transactions by both credit and debit columns
1. Double click cell in Summary will filter the transactions based on the account and month
1. Toggle for totals that will include the previous year roll-over or not
1. CSV Import with adjustable columns
    1. If any data is missing, a popup with the data populated will display to fill in whatever is missing.
1. Excel export

## Features Planned

1. Account CRUD
1. <s>Automaticly pull from bank accounts</s>
1. Show Column button
1. Graphs, all the graphs
