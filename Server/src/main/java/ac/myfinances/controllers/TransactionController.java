package ac.myfinances.controllers;

import ac.myfinances.generated.api.TransactionsApi;
import ac.myfinances.generated.model.Account;
import ac.myfinances.generated.model.ParentCategory;
import ac.myfinances.generated.model.Transaction;
import ac.myfinances.repo.AccountRepository;
import ac.myfinances.repo.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

@RestController
public class TransactionController implements TransactionsApi {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        return ResponseEntity.ok(this.transactionRepository.findAll());
    }

    @Override
    public ResponseEntity<List<Transaction>> updateTransactions(List<Transaction> transactions) {
        if (transactions == null) {
            return ResponseEntity.badRequest().build();
        }

        transactions.forEach(transaction -> {
            Account creditAccount = this.accountRepository.findByName((transaction.getCreditAccountId()));
            Account debitAccount = this.accountRepository.findByName((transaction.getDebitAccountId()));

            // The credit account couldn't be found using the name, it might have been passed in as an id
            if (creditAccount == null) {
                if( !this.accountRepository.findById(transaction.getCreditAccountId()).isPresent()) {
                    // if it's still present, error
                    throw new HttpClientErrorException(HttpStatus.BAD_REQUEST);
                }
            } else {
                transaction.setCreditAccountId(creditAccount.getId());
            }

            // The debit account couldn't be found using the name, it might have been passed in as an id
            if (debitAccount == null) {
                if( !this.accountRepository.findById(transaction.getDebitAccountId()).isPresent()) {
                    // if it's still present, error
                    throw new HttpClientErrorException(HttpStatus.BAD_REQUEST);
                }
            } else {
                transaction.setDebitAccountId(debitAccount.getId());
            }
        });

        List<Transaction> latestTransaction = this.transactionRepository.saveAll(transactions);

        return ResponseEntity.ok(latestTransaction);
    }

}
