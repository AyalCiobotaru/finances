# Cheabs Personal Finances App

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
- Boot up a MySql server using ```docker-compose up``` which will boot up the latest mySql Server with password = ```password```
- Bootrun the server to create the tables in the db using ```gradlew bootrun```
- Log into the server using the MySQL CLI from the ```Accounts``` directory
- Run the command ```source compilation.sql``` which will create the accounts in the Account table
- That will give the basic structure for the backend
- In the ```Widget``` directory, run ```npm i```
- Once that's finished, ```ng serve``` will start the app on ```localhost:4200```
- I've been using the transactions from my sheet to load in and mess around with different features



