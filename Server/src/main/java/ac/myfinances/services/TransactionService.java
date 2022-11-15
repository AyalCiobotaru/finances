package ac.myfinances.services;

import ac.myfinances.rest.model.Account;
import ac.myfinances.rest.model.Transaction;
import ac.myfinances.rest.model.TransactionDTO;
import ac.myfinances.repo.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
public class TransactionService {

    @Autowired
    private AccountRepository accountRepository;


    public Transaction verifyAccountId(TransactionDTO transactionDTO) {
        Transaction transaction = new Transaction();
        transaction.setDate(transactionDTO.getDate());
        transaction.setAmount(transactionDTO.getAmount());
        transaction.setDescription(transactionDTO.getDescription());

        this.accountRepository.findById(transactionDTO.getCreditAccountId()).ifPresent(transaction::setCreditAccount);
        this.accountRepository.findById(transactionDTO.getDebitAccountId()).ifPresent(transaction::setDebitAccount);


        return transaction;
    }

    public void handleAccountChanges(List<Transaction> transactions) {

        HashMap<String, Account> accountMap = new HashMap<>();
        List<Account> accounts = this.accountRepository.findAll();
        accounts.forEach(account -> {
            accountMap.put(account.getName(), account);
        });

        transactions.forEach(transaction -> {
            BigDecimal amount = transaction.getAmount();

            Account creditedAccount = accountMap.get(transaction.getCreditAccount().getName());
            creditedAccount.balance(creditedAccount.getBalance().add(amount));
            accountMap.put(creditedAccount.getName(), creditedAccount);

            Account debitedAccount = accountMap.get(transaction.getDebitAccount().getName());
            debitedAccount.balance(debitedAccount.getBalance().subtract(amount));
            accountMap.put(debitedAccount.getName(), debitedAccount);

        });

        this.accountRepository.saveAll(accountMap.values());
    }
}
