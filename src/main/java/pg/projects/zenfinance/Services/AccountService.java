package pg.projects.zenfinance.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pg.projects.zenfinance.DTOs.AccountCreationRequest;
import pg.projects.zenfinance.DTOs.AccountCreationResponse;
import pg.projects.zenfinance.Models.Account;
import pg.projects.zenfinance.Models.User;
import pg.projects.zenfinance.Repositorys.AccountRepository;
import pg.projects.zenfinance.Repositorys.TransactionRepository;
import pg.projects.zenfinance.Repositorys.UserRepository;

@Service
public class AccountService {

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    UserRepository userRepository;

    public AccountCreationResponse createAccount(AccountCreationRequest request, String userId){
        Account account = new Account();
        account.setUserId(userId);
        account.setOwnerName(userRepository.findUserByUserId(userId).getUsername());
        account.setAccountName(request.accountName());
        account.setBalance(request.balance());
        accountRepository.save(account);
        return toResponse(account);
    }

    private AccountCreationResponse toResponse(Account a){
        return new AccountCreationResponse(
                a.getAccountId(),
                a.getOwnerName(),
                a.getAccountName(),
                a.getBalance(),
                a.getCreatedAt()
        );
    }

}
