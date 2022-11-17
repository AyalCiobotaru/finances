package ac.myfinances.controllers;

import ac.myfinances.rest.api.TransactionsApi;
import ac.myfinances.rest.model.Transaction;
import ac.myfinances.rest.model.TransactionDTO;
import ac.myfinances.repo.TransactionRepository;
import ac.myfinances.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
    public ResponseEntity<List<Transaction>> updateOrAddTransactions(Map<String, TransactionDTO> transactions) {
        if (transactions == null) {
            return ResponseEntity.badRequest().build();
        }
        List<Transaction> updatedTransactions = this.transactionService.updateOrAddLogic(transactions);

        return ResponseEntity.ok(updatedTransactions);
    }

}
