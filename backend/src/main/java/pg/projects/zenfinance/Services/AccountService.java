package pg.projects.zenfinance.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pg.projects.zenfinance.DTOs.AccountCreationRequest;
import pg.projects.zenfinance.DTOs.AccountResponse;
import pg.projects.zenfinance.Models.Account;
import pg.projects.zenfinance.Repositorys.AccountRepository;
import pg.projects.zenfinance.Repositorys.UserRepository;

import java.util.List;

@Service
public class AccountService {

    @Autowired
    AccountRepository accountRepository;


    public AccountResponse createAccount(AccountCreationRequest request, String userId){
        Account account = new Account();
        account.setUserId(userId);
        account.setAccountName(request.accountName());
        account.setBalance(request.balance());
        accountRepository.save(account);
        return toResponse(account);
    }

    private AccountResponse toResponse(Account a){
        return new AccountResponse(
                a.getAccountId(),
                a.getAccountName(),
                a.getBalance(),
                a.getCreatedAt()
        );
    }

    public List<AccountResponse> getAllAccounts(String userId){
        List<Account> userAccounts = accountRepository.getAccountsByUserId(userId);
        if(userAccounts == null){
            return null;
        }
        return userAccounts.stream().map(this::toResponse).toList();
    }

    public AccountResponse getAccountById(String accountId){
        Account account = accountRepository.findAccountByAccountId(accountId);
        if(account == null){
            return null;
        }
        return toResponse(account);
    }

}
