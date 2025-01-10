-- app_user
INSERT INTO app_user (id, first_name, last_name, address, email, password, admin) VALUES
(gen_random_uuid(), 'Admin', 'Admin', '1 Admin Street', 'sae_spring.disburse070@passmail.net', '{noop}admin', true),
(gen_random_uuid(), 'John', 'Doe', '1 John Doe Street', 'sae_spring.generous659@passmail.net', '{noop}john', false),
(gen_random_uuid(), 'Jane', 'Doe', '1 Jane Doe Street', 'sae_spring.floral517@passmail.net', '{noop}jane', false),
(gen_random_uuid(), 'James', 'Smith', '1 James Smith Street', 'james@proton.me', '{noop}james', false),
(gen_random_uuid(), 'Jenny', 'Smith', '1 Jenny Smith Street', 'jenny@proton.me', '{noop}jenny', false);

-- business
INSERT INTO business (id, name, address, description) VALUES
(gen_random_uuid(), 'Doctor', '1 Doctor Street', 'Doctor Description'),
(gen_random_uuid(), 'Clinic', '1 Clinic Street', 'Clinic Description'),
(gen_random_uuid(), 'Pool', '1 Pool Street', 'Pool Description');

-- business_owners foreign key
INSERT INTO business_owners (business_id, owners_id) VALUES
((SELECT id FROM business WHERE name = 'Doctor'), (SELECT id FROM app_user WHERE first_name = 'Admin')),
((SELECT id FROM business WHERE name = 'Clinic'), (SELECT id FROM app_user WHERE first_name = 'John')),
((SELECT id FROM business WHERE name = 'Pool'), (SELECT id FROM app_user WHERE first_name = 'Jane')),
((SELECT id FROM business WHERE name = 'Pool'), (SELECT id FROM app_user WHERE first_name = 'James'));

-- app_user_businesses foreign key from business_owners
INSERT INTO app_user_businesses (app_user_id, businesses_id)
SELECT
    owners_id,
    business_id
FROM
    business_owners;

-- appointment slot
INSERT INTO appointment_slot (id, start_time, end_time, maximum_number_of_persons, day_of_week, business_id) VALUES
(gen_random_uuid(), 9 * 60, 9 * 60 + 15, 1, 1, (SELECT id FROM business WHERE name = 'Doctor')),
(gen_random_uuid(), 9 * 60 + 15, 9 * 60 + 30, 1, 2, (SELECT id FROM business WHERE name = 'Doctor')),
(gen_random_uuid(), 9 * 60 + 30, 9 * 60 + 45, 1, 3, (SELECT id FROM business WHERE name = 'Doctor')),
(gen_random_uuid(), 9 * 60 + 45, 10 * 60, 1, 4, (SELECT id FROM business WHERE name = 'Doctor')),
(gen_random_uuid(), 10 * 60, 10 * 60 + 15, 1, 5, (SELECT id FROM business WHERE name = 'Doctor'));

INSERT INTO appointment_slot (id, start_time, end_time, maximum_number_of_persons, day_of_week, business_id) VALUES
(gen_random_uuid(), 13 * 60, 13 * 60 + 30, 2, 1, (SELECT id FROM business WHERE name = 'Clinic')),
(gen_random_uuid(), 13 * 60 + 30, 14 * 60, 2, 2, (SELECT id FROM business WHERE name = 'Clinic')),
(gen_random_uuid(), 14 * 60, 14 * 60 + 30, 2, 3, (SELECT id FROM business WHERE name = 'Clinic')),
(gen_random_uuid(), 14 * 60 + 30, 15 * 60, 2, 4, (SELECT id FROM business WHERE name = 'Clinic')),
(gen_random_uuid(), 15 * 60, 15 * 60 + 30, 2, 5, (SELECT id FROM business WHERE name = 'Clinic'));

INSERT INTO appointment_slot (id, start_time, end_time, maximum_number_of_persons, day_of_week, business_id) VALUES
(gen_random_uuid(), 10 * 60, 10 * 60 + 60, 30, 6, (SELECT id FROM business WHERE name = 'Pool')),
(gen_random_uuid(), 11 * 60, 11 * 60 + 60, 30, 6, (SELECT id FROM business WHERE name = 'Pool')),
(gen_random_uuid(), 12 * 60, 12 * 60 + 60, 30, 6, (SELECT id FROM business WHERE name = 'Pool')),
(gen_random_uuid(), 13 * 60, 13 * 60 + 60, 30, 7, (SELECT id FROM business WHERE name = 'Pool')),
(gen_random_uuid(), 14 * 60, 14 * 60 + 60, 30, 7, (SELECT id FROM business WHERE name = 'Pool')),
(gen_random_uuid(), 15 * 60, 15 * 60 + 60, 30, 7, (SELECT id FROM business WHERE name = 'Pool'));

-- business_appointment_slots foreign key from appointment_slot
INSERT INTO business_appointment_slots (business_id, appointment_slots_id)
SELECT
    business_id,
    id
FROM
    appointment_slot;

-- appointment
INSERT INTO appointment_reserved (id, number_of_persons, appointment_date, owner_id, appointment_slot_id) VALUES
-- John and Jane go to the doctor on Monday and Tuesday
(gen_random_uuid(), 1, current_timestamp + interval '1 day',
 (SELECT id FROM app_user WHERE first_name = 'John'),
 (SELECT id FROM appointment_slot
  WHERE day_of_week = 1
    AND business_id = (SELECT id FROM business WHERE name = 'Doctor')
  ORDER BY start_time LIMIT 1)),
(gen_random_uuid(), 1, current_timestamp + interval '2 day',
 (SELECT id FROM app_user WHERE first_name = 'Jane'),
 (SELECT id FROM appointment_slot
  WHERE day_of_week = 2
    AND business_id = (SELECT id FROM business WHERE name = 'Doctor')
  ORDER BY start_time LIMIT 1)),
-- John goes to the clinic with Jane on Wednesday
(gen_random_uuid(), 2, current_timestamp + interval '3 day',
 (SELECT id FROM app_user WHERE first_name = 'John'),
 (SELECT id FROM appointment_slot
  WHERE day_of_week = 3
    AND business_id = (SELECT id FROM business WHERE name = 'Clinic')
  ORDER BY start_time LIMIT 1)),
(gen_random_uuid(), 1, current_timestamp + interval '3 day',
 (SELECT id FROM app_user WHERE first_name = 'Jane'),
 (SELECT id FROM appointment_slot
  WHERE day_of_week = 3
    AND business_id = (SELECT id FROM business WHERE name = 'Clinic')
  ORDER BY start_time LIMIT 1)),
-- James goes to the pool on weekends
(gen_random_uuid(), 1, current_timestamp + interval '6 day',
 (SELECT id FROM app_user WHERE first_name = 'James'),
 (SELECT id FROM appointment_slot
  WHERE day_of_week = 6
    AND business_id = (SELECT id FROM business WHERE name = 'Pool')
  ORDER BY start_time LIMIT 1)),
(gen_random_uuid(), 1, current_timestamp + interval '7 day',
 (SELECT id FROM app_user WHERE first_name = 'James'),
 (SELECT id FROM appointment_slot
  WHERE day_of_week = 7
    AND business_id = (SELECT id FROM business WHERE name = 'Pool')
  ORDER BY start_time LIMIT 1));

-- app_user_appointments foreign key from appointment_slot
INSERT INTO app_user_appointments_reserved (app_user_id, appointments_reserved_id)
SELECT
    owner_id,
    id
FROM
    appointment_reserved;

-- business_appointment_slots foreign key from appointment_slot
INSERT INTO appointment_slot_appointments (appointment_slot_id, appointments_id)
SELECT
    appointment_slot_id,
    id
FROM
    appointment_reserved;
