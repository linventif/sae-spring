package fr.but3.sae.appointment;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.format.DateTimeParseException;
import java.util.Date;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService service;

    @Autowired
    public AppointmentController(AppointmentService service) {
        this.service = service;
    }

    @Autowired
    private JavaMailSender sender;

    @GetMapping(produces = {"application/json", "application/xml"})
    public ResponseEntity<?> getAllAppointments(
            @RequestParam(required = false) String fromDate,
            @RequestParam(required = false) String toDate) throws MessagingException {

        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("gregoire.launaybecue.etu@univ-lille.fr");
        helper.setTo("gregoire.becue@proton.me");
        helper.setSubject("Hi");
        helper.setText("How are you?");
        sender.send(message);

        if (fromDate != null || toDate != null) {
            if (fromDate == null || toDate == null) {
                return ResponseEntity.badRequest().body("Both fromDate and toDate should be provided");
            }
            Date startDate;
            Date endDate;
            try {
                // convert space to + (removed by spring security)
                fromDate = fromDate.replace(" ", "+");
                toDate = toDate.replace(" ", "+");
                // parse dates
                Instant startInstant = Instant.parse(fromDate);
                Instant endInstant = Instant.parse(toDate);
                // convert to Date
                startDate = Date.from(startInstant);
                endDate = Date.from(endInstant);
            } catch (DateTimeParseException e) {
                return ResponseEntity.badRequest().body("Dates must be in ISO-8601 format");
            }
            return ResponseEntity.ok(service.getAllAppointmentsFromDateToDate(startDate, endDate));
        }
        return ResponseEntity.ok(service.getAllAppointments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentReserved> getAppointmentById(@PathVariable String id) {
        return service.getAppointmentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public AppointmentReserved createAppointment(@RequestBody AppointmentReserved appointment) {
        return service.createAppointment(appointment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable String id) {
        service.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }
}
