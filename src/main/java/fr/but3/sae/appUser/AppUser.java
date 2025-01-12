package fr.but3.sae.appUser;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.but3.sae.appointment.Appointment;
import fr.but3.sae.business.Business;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Validated
public class AppUser {
    @Id
    private String id = UUID.randomUUID().toString();

    @NotNull
    @NotEmpty
    private String firstName;

    @NotNull
    @NotEmpty
    private String lastName;

    private String address;

    @NotNull
    @NotEmpty
    private String email;

    @NotNull
    @NotEmpty
    private String password;

    private String profilePicture;

    @NotNull
    private boolean admin = false;

    @ManyToMany
    @JsonIgnore
    private List<Business> businesses;

    @OneToMany
    @JsonIgnore
    private List<Appointment> appointmentsReserved;
}
