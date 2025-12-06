package pg.projects.zenfinance.Repositorys;

import org.springframework.data.mongodb.repository.MongoRepository;
import pg.projects.zenfinance.Models.Account;
import pg.projects.zenfinance.Models.Transaction;

import java.util.List;

public interface TransactionRepository extends MongoRepository<Transaction, String> {

    List<Transaction> getTransactionsByAccountId(String accountId);

    List<Transaction> getTransactionsByUserId(String userId);
}