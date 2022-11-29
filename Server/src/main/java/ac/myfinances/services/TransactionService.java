package ac.myfinances.services;

import ac.myfinances.repo.TransactionRepository;
import ac.myfinances.rest.model.Account;
import ac.myfinances.rest.model.Transaction;
import ac.myfinances.rest.model.TransactionDTO;
import ac.myfinances.repo.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;


    /**
     * Handles separating the incoming transactions to new or updated ones and then saves them
     * @param transactions Map of id to transaction
     * @return updated transactions
     */
    public List<Transaction> updateOrAddLogic(List<TransactionDTO> transactions) {
//        List<TransactionDTO> newTransactionDTOs = new ArrayList<>();
        List<Transaction> newTransactions = new ArrayList<>();
//        List<Transaction> savedTransactions = new ArrayList<>();
//        List<Transaction> updatedTransactions = new ArrayList<>();
//
//        HashMap<String, TransactionDTO> transactionToUpdate = new HashMap<>();
//
//        // Separate transactionDTO into new transactions and those to update
//        transactions.forEach((key, value) -> {
//            if (key.contains("NEW")) {
//                newTransactionDTOs.add(value);
//            } else {
//                transactionToUpdate.put(key, value);
//            }
//        });

        // If we have new transactions, verify the account, handle account changes and save them
//        if (newTransactionDTOs.size() > 0) {
            transactions.forEach(transactionDTO -> {
                Transaction newTransaction = this.verifyAccountId(transactionDTO);
                this.handleAccountChanges(newTransaction);
                newTransactions.add(newTransaction);
            });
            List<Transaction> savedTransactions = this.transactionRepository.saveAll(newTransactions);
//        }
//
//        // If we have transactions to update, revert the old amounts for accounts, handle the new ones and save them
//        if (transactionToUpdate.size() > 0) {
//            this.revertOldTransactionAccounts(transactionToUpdate);
//            List<Transaction> dbTransactions = this.updateTransactions(transactionToUpdate);
//            this.handleAccountChanges(dbTransactions);
//            updatedTransactions = this.transactionRepository.saveAll(dbTransactions);
//        }

        // combine the two lists and return
        return savedTransactions;
    }

    /**
     * Gets transaction objects from the db based off of an id updates the fields.
     * @param transactions Map of id to TransactionDTO.
     * @return list of transactions to be saved.
     */
    public List<Transaction> updateTransactions(Map<String, TransactionDTO> transactions) {
        return this.transactionRepository.findAllById(new ArrayList<>(transactions.keySet())).
                stream().peek(t -> {
                    TransactionDTO dto = transactions.get(t.getId());
                    t.setDescription(dto.getDescription());
                    t.setAmount(dto.getAmount());
                    t.setDate(dto.getDate());
                    if (!dto.getCreditAccountId().equals(t.getCreditAccount().getId())) {
                        this.accountRepository.findById(dto.getCreditAccountId()).ifPresent(t::setCreditAccount);
                    }
                    if (!dto.getDebitAccountId().equals(t.getDebitAccount().getId())) {
                        this.accountRepository.findById(dto.getDebitAccountId()).ifPresent(t::setCreditAccount);
                    }
                }).collect(Collectors.toList());
    }

    public Transaction verifyAccountId(TransactionDTO transactionDTO) {
        Transaction transaction = new Transaction();
        transaction.setDate(transactionDTO.getDate());
        transaction.setAmount(transactionDTO.getAmount());
        transaction.setDescription(transactionDTO.getDescription());

        this.accountRepository.findById(transactionDTO.getCreditAccountId()).ifPresent(transaction::setCreditAccount);
        this.accountRepository.findById(transactionDTO.getDebitAccountId()).ifPresent(transaction::setDebitAccount);


        return transaction;
    }

    public Transaction handleTransactionUpdate(TransactionDTO oldTransactionDto, TransactionDTO updatedTransactionDto, Transaction foundTransaction) {
        Transaction updatedTransaction = null;

        if (!oldTransactionDto.getDate().equals(updatedTransactionDto.getDate())) {
            foundTransaction.setDate(updatedTransactionDto.getDate());
        } else if (!oldTransactionDto.getDescription().equals(updatedTransactionDto.getDescription())) {
            foundTransaction.setDescription(updatedTransactionDto.getDescription());
        } else {
            this.handleAccountChanges(foundTransaction, true);
            updatedTransaction = this.handleAccountChanges(updatedTransactionDto, false);
        }
        updatedTransaction = updatedTransaction == null ? this.transactionRepository.save(foundTransaction) : this.transactionRepository.save(updatedTransaction);

        return updatedTransaction;
    }

    public void handleAccountChanges(Transaction transaction) {
        this.handleAccountChanges(transaction, false);
    }

    public Transaction handleAccountChanges(TransactionDTO transactionDTO, Boolean inverted) {
        Transaction transaction = new Transaction()
            .id(transactionDTO.getId())
            .amount(transactionDTO.getAmount())
            .description(transactionDTO.getDescription())
            .date(transactionDTO.getDate());
        this.accountRepository.findById(transactionDTO.getCreditAccountId()).ifPresent(transaction::setCreditAccount);
        this.accountRepository.findById(transactionDTO.getDebitAccountId()).ifPresent(transaction::setDebitAccount);

        this.handleAccountChanges(transaction, inverted);
        return transaction;
    }

    public void handleAccountChanges(Transaction transaction, Boolean inverted) {
        HashMap<String, Account> accountMap = new HashMap<>();
        List<Account> accounts = this.accountRepository.findAll();
        accounts.forEach(account -> {
            accountMap.put(account.getName(), account);
        });
        HashMap<String, Account> accountsToUpdate = new HashMap<>();

        BigDecimal amount = transaction.getAmount();

        Account creditedAccount = accountMap.get(transaction.getCreditAccount().getName());
        creditedAccount.balance(inverted ? creditedAccount.getBalance().subtract(amount) : creditedAccount.getBalance().add(amount));
        accountsToUpdate.put(creditedAccount.getName(), creditedAccount);

        Account debitedAccount = accountMap.get(transaction.getDebitAccount().getName());
        // Income is slightly different, NEVER take money out of an income paper account, it should always be a positive number.
        if (debitedAccount.getType().equals("Income")) {
            debitedAccount.balance(inverted ? debitedAccount.getBalance().subtract(amount): debitedAccount.getBalance().add(amount));
        } else {
            debitedAccount.balance(inverted ? debitedAccount.getBalance().add(amount) : debitedAccount.getBalance().subtract(amount));
        }
        accountsToUpdate.put(debitedAccount.getName(), debitedAccount);

        this.accountRepository.saveAll(accountsToUpdate.values());
    }
}
