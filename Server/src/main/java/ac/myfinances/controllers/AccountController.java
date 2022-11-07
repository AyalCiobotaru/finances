package ac.myfinances.controllers;

import ac.myfinances.generated.api.AccountsApi;
import ac.myfinances.generated.model.Account;
import ac.myfinances.generated.model.CreateAccountBody;
import ac.myfinances.generated.model.ParentCategory;
import ac.myfinances.repo.AccountRepository;
import ac.myfinances.repo.ParentCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.awt.print.Pageable;
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
    public ResponseEntity<List<Account>> getAllAccounts() {
        return ResponseEntity.ok(accountRepo.findAll());
    }

    @Override
    public ResponseEntity<Void> createAccount(CreateAccountBody createAccountBody) {
        if (createAccountBody == null) {
            return ResponseEntity.badRequest().build();
        }
        Account newAccount = new Account();
        newAccount.name(createAccountBody.getName());
        newAccount.type(createAccountBody.getType());
        newAccount.balance(createAccountBody.getBalance());

        ParentCategory parentCategory = this.parentCategoryRepo.findByName(createAccountBody.getParentCategory());
        newAccount.parentCategory(parentCategory.getId());

        this.accountRepo.save(newAccount);
        return ResponseEntity.ok().build();
    }
}
