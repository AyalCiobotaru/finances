package ac.myfinances.repo;

import ac.myfinances.rest.model.ParentCategory;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParentCategoryRepository extends R2dbcRepository<ParentCategory, String> {

}
