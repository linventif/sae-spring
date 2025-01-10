# S5 Sae RDV

## Description

This project is a web application for managing appointments in a medical office.

## Installation

```bash
mvn install
```

## Settings

Copy the file `src/main/resources/application.example.properties` to `src/main/resources/application.properties` and set the following properties:

```properties
# JWT
jwt.secret=JWT_SECRET
jwt.expiration=36000000

# Mail
spring.mail.host=MAIL_HOST
spring.mail.port=MALI_PORT
spring.mail.username=MAIL_USER
spring.mail.password=MAIL_PASSWORD

# PostgreSQL
spring.datasource.url=jdbc:postgresql://DB_HOST:DB_PORT/DB_NAME
spring.datasource.username=DB_USER
spring.datasource.password=DB_PASSWORD
```
## Build

```bash
mvn package
```

## Prod Run

```bash
java -jar target/sae-0.0.1-SNAPSHOT.jar
```

## Dev Run

Start 2 terminals:

```bash
mvn spring-boot:run
```

```bash
npm run dev
```

By default, the Spring Boot server runs on port [8080](http://localhost:8080) and the SolidsJS server runs on port [3000](http://localhost:3000).