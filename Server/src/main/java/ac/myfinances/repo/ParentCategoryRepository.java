package ac.myfinances.repo;

import ac.myfinances.generated.model.ParentCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParentCategoryRepository extends JpaRepository<ParentCategory, String> {

    ParentCategory findByName(String name);

}
