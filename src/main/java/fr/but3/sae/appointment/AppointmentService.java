package fr.but3.sae.appointment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    private final AppointmentRepository repository;

    @Autowired
    public AppointmentService(AppointmentRepository repository) {
        this.repository = repository;
    }

    public List<AppointmentReserved> getAllAppointments() {
        return repository.findAll();
    }

    public List<AppointmentReserved> getAllAppointmentsFromDateToDate(Date startDate, Date endDate) {
        return repository.findByAppointmentDateBetween(startDate, endDate);
    }

    public Optional<AppointmentReserved> getAppointmentById(String id) {
        return repository.findById(id);
    }

    public AppointmentReserved createAppointment(AppointmentReserved appointment) {
        return repository.save(appointment);
    }

    public void deleteAppointment(String id) {
        repository.deleteById(id);
    }
}
