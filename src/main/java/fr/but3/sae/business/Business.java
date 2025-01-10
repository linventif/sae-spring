package fr.but3.sae.business;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.but3.sae.appUser.AppUser;
import fr.but3.sae.appointmentSlot.AppointmentSlot;
import jakarta.persistence.*;
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
public class Business {
    @Id
    private String id = UUID.randomUUID().toString();

    @NotNull
    @NotEmpty
    private String name;

    @NotNull
    @NotEmpty
    private String address;

    @NotNull
    @NotEmpty
    private String description;

    @OneToMany
    @JsonIgnore
    private List<AppointmentSlot> appointmentSlots;

    @ManyToMany
    @JsonIgnore
    private List<AppUser> owners;
}
