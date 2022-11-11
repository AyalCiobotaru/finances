package ac.myfinances.services;

import ac.myfinances.generated.model.Account;
import ac.myfinances.generated.model.Transaction;
import ac.myfinances.generated.model.TransactionDTO;
import ac.myfinances.repo.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

import java.util.ArrayList;
import java.util.Optional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TransactionService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ModelMapper modelMapper;

    private ArrayList<Account> accountsToUpdate = new ArrayList<>();

    public Transaction verifyAccountId(TransactionDTO transactionDTO) {
        this.accountsToUpdate.clear();

        // Changing to strict allows the tokenization of the entire variable instead of getting confused on 'account'
        this.modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        Transaction transaction = this.modelMapper.map(transactionDTO, Transaction.class);

        this.accountRepository.findById(transactionDTO.getCreditAccountId()).ifPresent(account -> {
            transaction.setCreditAccount(account);

        });
        this.accountRepository.findById(transactionDTO.getDebitAccountId()).ifPresent(account -> {
            transaction.setDebitAccount(account);
        });


        return transaction;
    }

    public void handleAccountChanges(List<Transaction> transactions) {

        transactions.forEach(transaction -> {
            Float amount = transaction.getAmount();

            Account creditedAccount = transaction.getCreditAccount();
            creditedAccount.balance(creditedAccount.getBalance() + amount);

            Account debitedAccount = transaction.getDebitAccount();
            debitedAccount.balance(debitedAccount.getBalance() - amount);

            this.accountsToUpdate.add(creditedAccount);
            this.accountsToUpdate.add(debitedAccount);
        });

        this.accountRepository.saveAll(this.accountsToUpdate);
        this.accountsToUpdate.clear();
    }
}
