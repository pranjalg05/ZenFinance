package pg.projects.zenfinance.Services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pg.projects.zenfinance.DTOs.*;
import pg.projects.zenfinance.Models.Account;
import pg.projects.zenfinance.Models.Transaction;
import pg.projects.zenfinance.Models.TransactionMode;
import pg.projects.zenfinance.Models.User;
import pg.projects.zenfinance.Repositorys.AccountRepository;
import pg.projects.zenfinance.Repositorys.TransactionTemplateRepository;
import pg.projects.zenfinance.Repositorys.UserRepository;

import java.util.List;

@Service
@Slf4j
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    AccountRepository accountRepository;

    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    TransactionTemplateRepository transactionTemplateRepository;

    public UserRegisterResponse registerUser(UserRegisterRequest request){

        if(userRepository.existsUserByUsername(request.username()) || userRepository.existsUserByEmail(request.email())){
            log.error("User already exists");
            return null;
        }

        User user = new User();
        user.setUsername(request.username());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setEmail(request.email());
        userRepository.save(user);

        return toResponse(user);
    }

    private UserRegisterResponse toResponse(User u){
        return new UserRegisterResponse(
                u.getUserId(),
                u.getUsername(),
                u.getEmail(),
                u.getCreatedAt()
        );
    }

    public User findUserByUsername(String username){
        return userRepository.findUserByUsername(username);
    }

    public UserSummaryResponse getUserSummary(String username){
        String userId = userRepository.findUserByUsername(username).getUserId();
        User user = userRepository.findUserByUserId(userId);
        List<Account> accounts = accountRepository.getAccountsByUserId(userId);

        double income = 0;
        double expense = 0;

        for(Account a : accounts){
            List<Transaction> transactions = transactionTemplateRepository.getTransactionOfCurrentMonth(a.getAccountId());
            System.out.println(transactions.toString());
            income += transactions.stream().filter(t -> t.getType() == TransactionMode.INCOME).mapToDouble(Transaction::getAmount).sum();
            expense += transactions.stream().filter(t -> t.getType() == TransactionMode.EXPENSE).mapToDouble(Transaction::getAmount).sum();
        }


        return new UserSummaryResponse(
                user.getUsername(),
                user.getEmail(),
                accounts == null ? 0 : accounts.size(),
                accounts == null ? 0 : accounts.stream().mapToDouble(Account::getBalance).sum(),
                income,
                expense
                );
    }

    public UserLoginResponse updateUser(UserEditRequest editRequest, String username) {
        User user = userRepository.findUserByUsername(username);
        if(editRequest.username() != null){
            user.setUsername(editRequest.username());
        }
        if(editRequest.password() != null){
            if(editRequest.oldPassword() == null || !passwordEncoder.matches(editRequest.oldPassword(), user.getPassword())) return null;
            user.setPassword(passwordEncoder.encode(editRequest.password()));
        }
        userRepository.save(user);
        return new UserLoginResponse(user.getUsername(), user.getEmail());
    }
}
