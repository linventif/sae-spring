package fr.but3.sae.appointment;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Validated
public class Appointment {
    @Id
    private String id = UUID.randomUUID().toString();

    @NotNull
    @NotEmpty
    private String title;

    @NotNull
    private Date startDate;

    @NotNull
    private Date endDate;

    @NotNull
    private int numberOfPersons;
}
