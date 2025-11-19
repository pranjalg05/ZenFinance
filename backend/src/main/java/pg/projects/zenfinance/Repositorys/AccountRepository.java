package pg.projects.zenfinance.Repositorys;

import org.springframework.data.mongodb.repository.MongoRepository;
import pg.projects.zenfinance.Models.Account;

import java.util.List;

public interface AccountRepository extends MongoRepository<Account, String> {

    List<Account> getAccountsByUserId(String userId);

    Account findAccountByAccountId(String accountId);

}