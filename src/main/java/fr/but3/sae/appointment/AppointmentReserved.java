package fr.but3.sae.appointment;

import fr.but3.sae.appUser.AppUser;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
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
public class AppointmentReserved {
    @Id
    private String id = UUID.randomUUID().toString();

    @NotNull
    private int numberOfPersons;

    @NotNull
    private Date appointmentDate;

    @ManyToOne
    private AppointmentSlot appointmentSlot;

    @ManyToOne
    private AppUser owner;
}
