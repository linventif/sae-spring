package fr.but3.sae.appUser;

import fr.but3.sae.appointment.AppointmentReserved;
import fr.but3.sae.business.Buisness;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
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

    @NotNull
    private boolean admin = false;

    @ManyToMany
    private List<Buisness> buisnesses;

    @OneToMany
    private List<AppointmentReserved> appointments;
}
