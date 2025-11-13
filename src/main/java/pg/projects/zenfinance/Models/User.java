package pg.projects.zenfinance.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "users")
public class User {

    @Id
    private String userId;

    @Indexed(unique = true)
    private String username;
    private String email;
    private String password;

    @CreatedDate
    private LocalDate createdAt;

}
