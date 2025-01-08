package fr.but3.sae.appointment;


import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, String> {

    List<Appointment> findByStartDateBetween(@NotNull @NotEmpty Date startDateAfter, @NotNull @NotEmpty Date startDateBefore);
}