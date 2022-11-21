package ac.myfinances.controllers;

import ac.myfinances.rest.api.TransactionsApi;
import ac.myfinances.rest.model.Transaction;
import ac.myfinances.rest.model.TransactionDTO;
import ac.myfinances.repo.TransactionRepository;
import ac.myfinances.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

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
    public ResponseEntity<List<Transaction>> updateOrAddTransactions(List<TransactionDTO> transactions) {
        if (transactions == null) {
            return ResponseEntity.badRequest().build();
        }
        HashMap<String, TransactionDTO> transactionMap = new HashMap<>();
        AtomicInteger newCounter = new AtomicInteger(1);
        transactions.forEach(t -> {
            transactionMap.put((t.getId() != null ? t.getId(): "NEW" + newCounter), t);
            newCounter.getAndIncrement();
        });
        List<Transaction> updatedTransactions = this.transactionService.updateOrAddLogic(transactionMap);

        return ResponseEntity.ok(updatedTransactions);
    }

}
