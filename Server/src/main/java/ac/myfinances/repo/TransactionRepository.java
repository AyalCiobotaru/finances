package ac.myfinances.repo;

import ac.myfinances.rest.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, String> {
    @Modifying
    @Transactional
    @Query(value = "DELETE credit_account_transaction" +
            " FROM myServer.credit_account_transaction JOIN myServer.transaction ON" +
            "     myServer.credit_account_transaction.transaction_id = myServer.transaction.id" +
            "        WHERE transaction.id = ?1"
            , nativeQuery = true)
    Integer deleteCreditTransaction(String transactionId);

    @Modifying
    @Transactional
    @Query(value = "DELETE debit_account_transaction" +
            " FROM myServer.debit_account_transaction JOIN myServer.transaction ON" +
            "     myServer.debit_account_transaction.transaction_id = myServer.transaction.id" +
            "        WHERE transaction.id = ?1"
            , nativeQuery = true)
    Integer deleteDebitTransaction(String transactionId);
}
