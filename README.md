# 🏠 Hostel Management System

A complete web-based **Hostel Management System** designed to simplify and manage hostel-related activities such as student records, room management, room allocation, fees, complaints, notices, visitors and contact enquiries.

This project is developed as a college/project application using **HTML, CSS, JavaScript, Node.js, Express.js and MySQL**.

---

## 📌 Project Overview

The Hostel Management System provides a centralized platform for managing hostel operations.

It helps hostel administrators maintain:

- Student information
- Hostel room information
- Room allocation
- Fee records
- Student complaints
- Hostel notices
- Visitor records
- Contact enquiries

The system provides a simple, attractive and user-friendly interface for hostel management.

---

## ✨ Features

### 👨‍🎓 Student Management
- Add student details
- Store student name, roll number, course, year, phone and email
- View student records
- Manage student information

### 🏠 Room Management
- Add hostel rooms
- Store room number, block, room type and capacity
- Track occupied beds
- Display room availability
- Prevent duplicate room numbers

### 📋 Room Allocation
- Allocate rooms to students
- Manage student-room allocation
- Track allocated rooms

### 💰 Fee Management
- Store student fee details
- Track fee amounts
- Manage payment status
- Maintain fee records

### 📝 Complaint Management
- Students can submit complaints
- Store complaint details
- Track complaint records
- Manage complaint status

### 📢 Notice Management
- Add hostel notices
- Display important announcements
- Manage notice information

### 👥 Visitor Management
- Add visitor details
- Store visitor name and student name
- Store phone number
- Store purpose of visit
- Store visit date and time
- Maintain visitor records

### 📞 Contact Management
- Contact form for enquiries
- Store name, email, subject and message
- Contact information of Hostel Management available on the website

---

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MySQL

### Development Tools
- Visual Studio Code
- MySQL Workbench
- Git
- GitHub

---

## 📂 Project Structure

```text
Hostel-Management-System/
│
├── public/
│   ├── index.html
│   ├── students.html
│   ├── Rooms.html
│   ├── Allocation.html
│   ├── fees.html
│   ├── complaints.html
│   ├── notices.html
│   ├── visitors.html
│   ├── contact.html
│   ├── style.css
│   └── app.js
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

## 📄 Website Pages

| Page | Description |
|------|-------------|
| 🏠 Home | Hostel management dashboard/home page |
| 👨‍🎓 Students | Student record management |
| 🏠 Rooms | Hostel room management |
| 📋 Allocation | Student room allocation |
| 💰 Fees | Fee management |
| 📝 Complaints | Complaint management |
| 📢 Notices | Hostel notices and announcements |
| 👥 Visitors | Visitor record management |
| 📞 Contact | Contact and enquiry form |

---

## 🗄️ Database

The project uses **MySQL** as the database.

The database contains tables for different hostel management modules such as:

- Students
- Rooms
- Allocations
- Fees
- Complaints
- Notices
- Visitors
- Contacts

The backend communicates with MySQL through Node.js.

---

## 🚀 How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/Shivansh5122004/Hostel-Management-System.git
```

### 2. Open the project

```bash
cd Hostel-Management-System
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure MySQL

Create a MySQL database named:

```text
hostel_management
```

Configure the database credentials in the `.env` file.

Example:

```text
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hostel_management
DB_PORT=3306
```

### 5. Start the server

```bash
node server.js
```

The server will start on:

```text
http://localhost:3000
```

### 6. Open the website

Open your browser and visit:

```text
http://localhost:3000
```

---

## 🎯 Project Objectives

The main objectives of this project are:

1. To digitize hostel management.
2. To reduce manual record keeping.
3. To manage student information efficiently.
4. To simplify room allocation.
5. To maintain hostel fee records.
6. To manage complaints and notices.
7. To maintain visitor records.
8. To provide a centralized hostel management platform.

---

## 🔐 Data & Security

Sensitive configuration such as database credentials is stored in the `.env` file.

The `.env` file is excluded from GitHub using `.gitignore`.

```text
.env
node_modules/
```

---

## 👨‍💻 Developer

**Shivansh Srivastava**

Hostel Management System

---

## 📌 Project Type

**Academic / College Project**

This project is developed for educational and demonstration purposes.

---

## 🔮 Future Improvements

Future versions of the project can include:

- Admin login and authentication
- Student login
- Online fee payment
- Room availability dashboard
- Automated notifications
- Email notifications
- WhatsApp notifications
- Advanced reports
- Search and filtering
- Responsive mobile design

---

## ⭐ Conclusion

The **Hostel Management System** provides a simple and efficient solution for managing hostel operations digitally.

It combines a user-friendly frontend with a Node.js backend and MySQL database to create a complete hostel management application.