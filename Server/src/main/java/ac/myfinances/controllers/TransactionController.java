package ac.myfinances.controllers;

import ac.myfinances.rest.api.TransactionsApi;
import ac.myfinances.rest.model.Transaction;
import ac.myfinances.rest.model.TransactionDTO;
import ac.myfinances.repo.TransactionRepository;
import ac.myfinances.rest.model.UpdateTransactionBody;
import ac.myfinances.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class TransactionController implements TransactionsApi {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private TransactionService transactionService;

    @Override
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        return ResponseEntity.ok(this.transactionRepository.findAll());
    }

    @Override
    public ResponseEntity<List<Transaction>> addTransactions(List<TransactionDTO> transactions) {
        if (transactions == null) {
            return ResponseEntity.badRequest().build();
        }
        List<Transaction> newTransactions = new ArrayList<>();

        transactions.forEach(transactionDTO -> {
            Transaction newTransaction = this.transactionService.verifyAccountId(transactionDTO);
            this.transactionService.handleAccountChanges(newTransaction);
            newTransactions.add(newTransaction);
        });
        List<Transaction> savedTransactions = this.transactionRepository.saveAll(newTransactions);

        return ResponseEntity.ok(savedTransactions);
    }

    @Override
    public ResponseEntity<Transaction> updateTransaction(UpdateTransactionBody updateTransactionBody) {
        TransactionDTO oldTransactionDto = updateTransactionBody.getOldTransaction();
        TransactionDTO updatedTransactionDto = updateTransactionBody.getUpdatedTransactionTransaction();
        final Transaction[] updatedTransaction = {null};

        this.transactionRepository.findById(oldTransactionDto.getId()).ifPresent(transaction -> {
            updatedTransaction[0] = this.transactionService.handleTransactionUpdate(oldTransactionDto, updatedTransactionDto, transaction);
        });

        return ResponseEntity.ok(updatedTransaction[0]);
    }

    @Override
    public ResponseEntity<Transaction> deleteTransaction(String transactionId) {
        final Transaction[] deletedTransactions = {null};
        this.transactionRepository.findById(transactionId).ifPresent(transaction -> {
            this.transactionService.handleAccountChanges(transaction, true);
            deletedTransactions[0] = transaction;

            this.transactionRepository.deleteById(transactionId);
        });

        return ResponseEntity.ok(deletedTransactions[0]);
    }
}
