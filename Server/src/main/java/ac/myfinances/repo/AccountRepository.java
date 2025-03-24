package ac.myfinances.repo;

import ac.myfinances.rest.model.Account;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
//import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends R2dbcRepository<Account, String> {

    Account findByName(String name);
}
