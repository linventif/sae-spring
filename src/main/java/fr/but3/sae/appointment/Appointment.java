package fr.but3.sae.appointment;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.but3.sae.appUser.AppUser;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

import fr.but3.sae.appointmentSlot.AppointmentSlot;

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
    private int numberOfPersons;

    @NotNull
    private Date appointmentDate;

    @ManyToOne
    @JsonIgnore
    private AppointmentSlot appointmentSlot;

    @ManyToOne
    @JsonIgnore
    private AppUser owner;
}
