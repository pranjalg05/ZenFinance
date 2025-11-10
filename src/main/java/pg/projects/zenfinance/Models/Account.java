package pg.projects.zenfinance.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@AllArgsConstructor
@Data
@Document(collection = "accounts")
public class Account {

    @Id
    private String accountId;
    private String userId;
    private Double balance;
    private String currency = "INR";

    @CreatedDate
    private LocalDate createdAt;

}
