package pg.projects.zenfinance.Services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pg.projects.zenfinance.DTOs.UserRegisterRequest;
import pg.projects.zenfinance.DTOs.UserRegisterResponse;
import pg.projects.zenfinance.Models.User;
import pg.projects.zenfinance.Repositorys.UserRepository;

@Service
@Slf4j
public class UserService {

    @Autowired
    UserRepository userRepository;

    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


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

}
