package ac.myfinances.controllers;

import ac.myfinances.rest.api.AccountsApi;
import ac.myfinances.rest.model.Account;
import ac.myfinances.repo.AccountRepository;
import ac.myfinances.repo.ParentCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping
public class AccountController implements AccountsApi {

    @Autowired
    private AccountRepository accountRepo;
    
    @Override
    public ResponseEntity<Account> getAccountById(String id) {
        return AccountsApi.super.getAccountById(id);
    }

    @Override
    public ResponseEntity<Account> getAccountByName(String name) {
        return ResponseEntity.ok(this.accountRepo.findByName(name));
    }

    @Override
    public ResponseEntity<List<Account>> getAllAccounts() {
        return ResponseEntity.ok(accountRepo.findAll());
    }

    @Override
    public ResponseEntity<Void> createAccount(List<Account> accounts) {
        if (accounts == null) {
            return ResponseEntity.badRequest().build();
        }

        this.accountRepo.saveAll(accounts);
        return ResponseEntity.ok().build();
    }
}
