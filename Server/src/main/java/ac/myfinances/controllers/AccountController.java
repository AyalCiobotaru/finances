package ac.myfinances.controllers;

import ac.myfinances.rest.api.AccountsApi;
import ac.myfinances.rest.model.Account;
import ac.myfinances.rest.model.ParentCategory;
import ac.myfinances.repo.AccountRepository;
import ac.myfinances.repo.ParentCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

@RestController
@RequestMapping
public class AccountController implements AccountsApi {

    @Autowired
    private AccountRepository accountRepo;

    @Autowired
    private ParentCategoryRepository parentCategoryRepo;

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
//        accounts.forEach(account -> {
//            ParentCategory parent = this.parentCategoryRepo.findByName((account.getParentCategory()));
//
//            // The parent category couldn't be found using the name, it might have been passed in as an id
//            if (parent == null) {
//                if (!this.parentCategoryRepo.findById(account.getParentCategory()).isPresent()) {
//                    // if it's missing, error
//                    throw new HttpClientErrorException(HttpStatus.BAD_REQUEST);
//                }
//            } else {
//                account.setParentCategory(parent.getId());
//            }
//
//        });

        this.accountRepo.saveAll(accounts);
        return ResponseEntity.ok().build();
    }
}
