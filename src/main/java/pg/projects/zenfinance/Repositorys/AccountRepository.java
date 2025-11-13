package pg.projects.zenfinance.Repositorys;

import org.springframework.data.mongodb.repository.MongoRepository;
import pg.projects.zenfinance.Models.Account;

public interface AccountRepository extends MongoRepository<Account, String> {

}