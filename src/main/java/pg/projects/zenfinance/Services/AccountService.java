package pg.projects.zenfinance.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pg.projects.zenfinance.DTOs.AccountCreationRequest;
import pg.projects.zenfinance.DTOs.AccountCreationResponse;
import pg.projects.zenfinance.Models.User;
import pg.projects.zenfinance.Repositorys.AccountRepository;
import pg.projects.zenfinance.Repositorys.TransactionRepository;
import pg.projects.zenfinance.Repositorys.UserRepository;

@Service
public class AccountService {

    @Autowired
    AccountRepository accountRepository;

    public AccountCreationResponse createAccount(AccountCreationRequest request){

    }

}
