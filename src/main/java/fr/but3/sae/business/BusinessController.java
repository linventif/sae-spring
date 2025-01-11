package fr.but3.sae.business;

import fr.but3.sae.appointment.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/business")
public class BusinessController {

    @Autowired
    private BusinessRepository businessRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @GetMapping()
    public ResponseEntity<?> getAllBusiness() {
        List<Business> business = businessRepository.findAll();
        return ResponseEntity.ok(business);
    }
}