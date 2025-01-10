package fr.but3.sae.appointmentSlot;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import fr.but3.sae.appointment.AppointmentReserved;
import fr.but3.sae.business.Business;
import jakarta.persistence.*;
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
public class AppointmentSlot {
    @Id
    private String id = UUID.randomUUID().toString();

    // ex: 9h15 to 10h15 -> 9*60+15 = 555
    @NotNull
    private int startTime;

    // ex: 9h15 to 10h15 -> 10*60+15 = 615
    @NotNull
    private int endTime;

    @NotNull
    private int maximumNumberOfPersons;

    @NotNull
    private int dayOfWeek;

    @OneToMany
    @JsonIgnore
    private List<AppointmentReserved> appointments;

    @ManyToOne
    private Business business;
}
