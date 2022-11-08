package ac.myfinances.controllers;

import ac.myfinances.generated.api.TransactionsApi;
import ac.myfinances.generated.model.Account;
import ac.myfinances.generated.model.ParentCategory;
import ac.myfinances.generated.model.Transaction;
import ac.myfinances.repo.AccountRepository;
import ac.myfinances.repo.TransactionRepository;
import ac.myfinances.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;

import java.util.ArrayList;
import java.util.List;

@RestController
public class TransactionController implements TransactionsApi {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionService transactionService;

    @Override
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        return ResponseEntity.ok(this.transactionRepository.findAll());
    }

    @Override
    public ResponseEntity<List<Transaction>> updateTransactions(List<Transaction> transactions) {
        if (transactions == null) {
            return ResponseEntity.badRequest().build();
        }

        List<Transaction> verifiedAccountsInTransactions = new ArrayList<>();

        transactions.forEach(transaction -> {
            Transaction verifiedTransaction = this.transactionService.verifyAccountId(transaction);
            verifiedAccountsInTransactions.add(verifiedTransaction);
        });

        this.transactionService.handleAccountChanges(verifiedAccountsInTransactions);

        List<Transaction> latestTransaction = this.transactionRepository.saveAll(verifiedAccountsInTransactions);

        return ResponseEntity.ok(latestTransaction);
    }

}
