# Medical Appointment Management - NestJS

This project is a medical appointment management application developed with the **NestJS** framework. It allows doctors and patients to interact with a system to schedule, manage, and view appointments efficiently.

---

## 🚀 Features

- **Authentication and Authorization**:
  - Login with unique credentials.
  - User roles: `Admin`, `Doctor`, `Patient`.
- **Doctor Management**:
  - CRUD operations for doctors with specialties and available schedules.
  - View scheduled appointments for each doctor.
- **Patient Management**:
  - CRUD operations for patients with basic information and credentials.
  - Medical appointment history for patients.
- **Appointment Management**:
  - Schedule appointments ensuring doctor availability.
  - Cancel and reschedule appointments.
  - Link appointments with doctors and patients.

---

## 🛠️ Technologies Used

- **NestJS**: Framework for building robust and modular Node.js applications.
- **TypeORM**: ORM for managing database interactions with PostgreSQL.
- **PostgreSQL**: Relational database.
- **JWT**: For authentication and token management.
- **Class-validator**: Data validation for DTOs.

---

## ⚙️ Installation

### 1. Clone this repository:
```bash
git clone https://github.com/dalona/clinicAppointments
cd clinic-appointments
