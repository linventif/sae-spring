-- data.sql

INSERT INTO appointment (id, title, start_date, end_date, number_of_persons) VALUES
(gen_random_uuid(), 'General Check-up', current_timestamp + interval '1 day', current_timestamp + interval '1 day' + interval '1 hour', 5),
(gen_random_uuid(), 'Dental Cleaning', current_timestamp + interval '2 day', current_timestamp + interval '2 day' + interval '1 hour', 10),
(gen_random_uuid(), 'Eye Examination', current_timestamp + interval '3 day', current_timestamp + interval '3 day' + interval '1 hour', 15),
(gen_random_uuid(), 'Physical Therapy', current_timestamp + interval '4 day', current_timestamp + interval '4 day' + interval '1 hour', 20),
(gen_random_uuid(), 'Vaccination Appointment', current_timestamp + interval '5 day', current_timestamp + interval '5 day' + interval '1 hour', 8),
(gen_random_uuid(), 'Follow-up Consultation', current_timestamp + interval '6 day', current_timestamp + interval '6 day' + interval '1 hour', 6),
(gen_random_uuid(), 'Nutritionist Appointment', current_timestamp + interval '7 day', current_timestamp + interval '7 day' + interval '1 hour', 3),
(gen_random_uuid(), 'Pediatric Check-up', current_timestamp + interval '8 day', current_timestamp + interval '8 day' + interval '1 hour', 9),
(gen_random_uuid(), 'Orthopedic Assessment', current_timestamp + interval '9 day', current_timestamp + interval '9 day' + interval '1 hour', 4),
(gen_random_uuid(), 'Skin Specialist Consultation', current_timestamp + interval '10 day', current_timestamp + interval '10 day' + interval '1 hour', 7),
(gen_random_uuid(), 'Cardiologist Visit', current_timestamp + interval '11 day', current_timestamp + interval '11 day' + interval '1 hour', 12),
(gen_random_uuid(), 'Diabetes Management Session', current_timestamp + interval '12 day', current_timestamp + interval '12 day' + interval '1 hour', 8),
(gen_random_uuid(), 'ENT Specialist Appointment', current_timestamp + interval '13 day', current_timestamp + interval '13 day' + interval '1 hour', 6),
(gen_random_uuid(), 'Radiology Scan', current_timestamp + interval '14 day', current_timestamp + interval '14 day' + interval '1 hour', 11),
(gen_random_uuid(), 'Psychiatric Counseling', current_timestamp + interval '15 day', current_timestamp + interval '15 day' + interval '1 hour', 2);