package ac.myfinances.services;

import ac.myfinances.generated.model.Account;
import ac.myfinances.generated.model.Transaction;
import ac.myfinances.repo.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TransactionService {

    @Autowired
    private AccountRepository accountRepository;

    private final Map<String, Account> accountsToUpdate = new HashMap<>();

    public Transaction verifyAccountId(Transaction transaction) {
        this.accountsToUpdate.clear();

        Account creditAccount = this.accountRepository.findByName((transaction.getCreditAccountId()));
        Account debitAccount = this.accountRepository.findByName((transaction.getDebitAccountId()));

        // The credit account couldn't be found using the name, it might have been passed in as an id
        if (creditAccount == null) {
            if (!this.accountRepository.findById(transaction.getCreditAccountId()).isPresent()) {
                // if it's still present, error
                throw new HttpClientErrorException(HttpStatus.BAD_REQUEST);
            }
        } else {
            transaction.setCreditAccountId(creditAccount.getId());
        }

        // The debit account couldn't be found using the name, it might have been passed in as an id
        if (debitAccount == null) {
            if (!this.accountRepository.findById(transaction.getDebitAccountId()).isPresent()) {
                // if it's still present, error
                throw new HttpClientErrorException(HttpStatus.BAD_REQUEST);
            }
        } else {
            transaction.setDebitAccountId(debitAccount.getId());
        }

        this.accountsToUpdate.put(creditAccount.getId(), creditAccount);
        this.accountsToUpdate.put(creditAccount.getId(), debitAccount);

        return transaction;
    }

    public void handleAccountChanges(List<Transaction> transactions) {

        transactions.forEach(transaction -> {
            Float amount = transaction.getAmount();

            Account creditedAccount = this.accountsToUpdate.get(transaction.getCreditAccountId());
            creditedAccount.balance(creditedAccount.getBalance() + amount);

            Account debitedAccount = this.accountsToUpdate.get(transaction.getDebitAccountId());
            debitedAccount.balance(debitedAccount.getBalance() - amount);

            this.accountsToUpdate.put(transaction.getCreditAccountId(), creditedAccount);
            this.accountsToUpdate.put(transaction.getDebitAccountId(), debitedAccount);
        });

        this.accountRepository.saveAll(this.accountsToUpdate.values());
        this.accountsToUpdate.clear();
    }
}
