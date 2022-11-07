package ac.myfinances.controllers;

import ac.myfinances.generated.api.ParentCategoryApi;
import ac.myfinances.generated.model.ParentCategory;
import ac.myfinances.repo.ParentCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ParentCategoryController implements ParentCategoryApi {

    @Autowired
    private ParentCategoryRepository parentCategoryRepo;

    @Override
    public ResponseEntity<List<ParentCategory>> getAllParentCategories() {
        return ResponseEntity.ok(this.parentCategoryRepo.findAll());
    }

    @Override
    public ResponseEntity<Void> createParentCategory(String body) {
        ParentCategory newParentCategory = new ParentCategory();
        newParentCategory.name(body);

        this.parentCategoryRepo.save(newParentCategory);

        return ResponseEntity.ok().build();
    }
}
