package pg.projects.zenfinance.Repositorys;

import org.springframework.data.mongodb.repository.MongoRepository;
import pg.projects.zenfinance.Models.Account;
import pg.projects.zenfinance.Models.User;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {
        boolean existsUserByUsername(String username);
        boolean existsUserByEmail(String email);
        User findUserByUsername(String username);
        User findUserByUserId(String userId);
}
