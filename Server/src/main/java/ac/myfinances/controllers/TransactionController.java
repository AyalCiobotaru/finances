package ac.myfinances.controllers;

import ac.myfinances.generated.api.TransactionsApi;
import ac.myfinances.generated.model.Account;
import ac.myfinances.generated.model.CreateTransactionBody;
import ac.myfinances.generated.model.Transaction;
import ac.myfinances.repo.AccountRepository;
import ac.myfinances.repo.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<Void> createTransaction(CreateTransactionBody createTransactionBody) {
        if (createTransactionBody == null) {
            return ResponseEntity.badRequest().build();
        }

        Transaction newTransaction = new Transaction();
        newTransaction.amount(createTransactionBody.getAmount());
        newTransaction.date(createTransactionBody.getDate());
        newTransaction.description(createTransactionBody.getDescription());

        Account creditAccount = this.accountRepository.findByName(createTransactionBody.getCreditAccountName());
        Account debitAccount = this.accountRepository.findByName(createTransactionBody.getDebitAccountName());
        newTransaction.creditAccountId(creditAccount.getId());
        newTransaction.debitAccountId(debitAccount.getId());

        this.transactionRepository.save(newTransaction);

        return ResponseEntity.ok().build();
    }

}
