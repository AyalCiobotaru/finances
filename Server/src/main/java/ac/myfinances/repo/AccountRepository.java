package ac.myfinances.repo;

import ac.myfinances.rest.model.Account;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends ReactiveCrudRepository<Account, String> {

    Account findByName(String name);
}
