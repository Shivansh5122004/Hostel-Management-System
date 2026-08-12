const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// PUBLIC FOLDER
// ===============================

app.use(express.static(path.join(__dirname, "public")));

// ===============================
// MYSQL CONNECTION
// ===============================

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.log("MySQL Connection Failed:", err.message);
        return;
    }

    console.log("MySQL Connected");

    // Check students table
    db.query("DESCRIBE students", (err) => {
        if (err) {
            console.log("Students table error:", err.message);
        } else {
            console.log("Students table ready");
        }
    });

    // Create rooms table if it does not exist
    const createRoomsTable = `
        CREATE TABLE IF NOT EXISTS rooms (
            id INT AUTO_INCREMENT PRIMARY KEY,
            room_no VARCHAR(20) NOT NULL,
            block VARCHAR(100) NOT NULL,
            type VARCHAR(50) NOT NULL,
            capacity INT NOT NULL,
            occupied INT DEFAULT 0,
            status VARCHAR(50) DEFAULT 'Available'
        )
    `;

    db.query(createRoomsTable, (err) => {
        if (err) {
            console.log("Rooms table error:", err.message);
        } else {
            console.log("Rooms table ready");
        }
    });
});

// ===============================
// HOME PAGE
// ===============================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ==================================================
//                    STUDENTS
// ==================================================

// STUDENTS - GET ALL
app.get("/api/students", (req, res) => {

    const sql = `
        SELECT
            id,
            name,
            roll_no,
            course,
            year,
            phone,
            email
        FROM students
        ORDER BY id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log("GET students error:", err.message);

            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            data: result
        });
    });
});

// STUDENTS - ADD
app.post("/api/students", (req, res) => {

    const {
        name,
        roll_no,
        course,
        year,
        phone,
        email
    } = req.body;

    if (!name || !roll_no || !course || !year || !phone || !email) {

        return res.status(400).json({
            success: false,
            message: "Please fill all fields"
        });
    }

    const sql = `
INSERT INTO students
(name, roll_no, course, year, phone, email)
VALUES (?,?,?,?,?,?)
`;

const values = [
    name,
    roll_no,
    course,
    year,
    phone,
    email
];

    db.query(sql, values, (err, result) => {

        if (err) {
            console.log("ADD student error:", err.message);

            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Student added successfully",
            id: result.insertId
        });
    });
});

// STUDENTS - DELETE
app.delete("/api/students/:id", (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM students WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.log("DELETE student error:", err.message);

            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Student deleted successfully"
        });
    });
});
// GET FEES
app.get("/api/fees",(req,res)=>{
// =========================
// ADD FEE
// =========================

app.post("/api/fees", (req, res) => {

    const {
        student_id,
        amount,
        fee_type,
        payment_date,
        status,
        payment_method
    } = req.body;

    if (!student_id || !amount || !fee_type || !payment_date || !status || !payment_method) {
        return res.status(400).json({
            success: false,
            message: "Please fill all fee fields"
        });
    }

    const sql = `
        INSERT INTO fees
        (student_id, amount, fee_type, payment_date, status, payment_method)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
        student_id,
        amount,
        fee_type,
        payment_date,
        status,
        payment_method
    ];

    db.query(sql, values, (err, result) => {

        if (err) {
            console.log("Fee Insert Error:", err);

            return res.status(500).json({
                success: false,
                message: "Fee record add nahi hua",
                error: err
            });
        }

        res.json({
            success: true,
            message: "Fee record added successfully",
            id: result.insertId
        });

    });

});
    db.query(
        "SELECT * FROM fees ORDER BY id DESC",
        (err,result)=>{

            if(err){
                console.log(err);

                return res.json({
                    success:false,
                    error:err
                });
            }


            res.json({
                success:true,
                data:result
            });

        }
    );

});
// ==================================================
//                      ROOMS
// ==================================================


// ROOMS - GET ALL
app.get("/api/rooms", (req, res) => {

    const sql = `
        SELECT
            id,
            room_no,
            block,
            type,
            capacity,
            occupied,
            CASE
                WHEN occupied >= capacity THEN 'Full'
                ELSE 'Available'
            END AS status
        FROM rooms
        ORDER BY id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {

            console.log("GET rooms error:", err.message);

            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            data: result
        });

    });

});


// ROOMS - ADD
app.post("/api/rooms", (req, res) => {

    const {
        room_no,
        block,
        type,
        capacity
    } = req.body;


    if (!room_no || !block || !type || !capacity) {

        return res.status(400).json({
            success: false,
            message: "Please fill all room fields"
        });

    }


    const sql = `
        INSERT INTO rooms
        (
            room_no,
            block,
            type,
            capacity,
            occupied
        )
        VALUES (?, ?, ?, ?, 0)
    `;


    const values = [
        room_no,
        block,
        type,
        Number(capacity)
    ];


    db.query(sql, values, (err, result) => {

        if (err) {

            console.log("ADD room error:", err.message);

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }


        res.json({
            success: true,
            message: "Room added successfully",
            id: result.insertId
        });

    });

});


// ROOMS - DELETE
app.delete("/api/rooms/:id", (req, res) => {

    const id = req.params.id;

    const sql =
        "DELETE FROM rooms WHERE id = ?";

    db.query(sql, [id], (err, result) => {
    }
    )}
)
// ROOMS - DELETE
app.delete("/api/rooms/:id", (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM rooms WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.log("DELETE room error:", err.message);

            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Room deleted successfully"
        });
    });

});   // ← ROOMS DELETE YAHAN COMPLETELY END

// ==================================================
//                    ALLOCATIONS
// ==================================================

app.get("/api/allocations", (req, res) => {

    const sql = `
        SELECT
            id,
            student_name,
            room_no,
            bed_no,
            allocation_date
        FROM allocations
        ORDER BY id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log("GET allocations error:", err.message);

            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            data: result
        });
    });

});


app.post("/api/allocations", (req, res) => {
// ================= FEES =================

app.get("/api/fees", (req,res)=>{

    const sql = `
    SELECT 
    id,
    student_name,
    amount,
    fee_type,
    status,
    payment_date
    FROM fees
    ORDER BY id DESC
    `;

    db.query(sql,(err,result)=>{

        if(err){
            return res.status(500).json({
                success:false,
                message:err.message
            });
        }

        res.json({
            success:true,
            data:result
        });

    });

});



app.post("/api/fees",(req,res)=>{

    const {
        student_name,
        amount,
        fee_type,
        status,
        payment_date
    } = req.body;


    const sql = `
    INSERT INTO fees
    (student_name,amount,fee_type,status,payment_date)
    VALUES (?,?,?,?,?)
    `;


    db.query(
        sql,
        [
            student_name,
            amount,
            fee_type,
            status,
            payment_date
        ],
        (err,result)=>{

            if(err){
                return res.status(500).json({
                    success:false,
                    message:err.message
                });
            }


            res.json({
                success:true,
                message:"Fee Added Successfully"
            });

        }
    );


});
    const {
        student_name,
        room_no,
        bed_no,
        allocation_date
    } = req.body;

    if (!student_name || !room_no || !bed_no || !allocation_date) {

        return res.status(400).json({
            success: false,
            message: "Please fill all allocation fields"
        });
    }

    const sql = `
        INSERT INTO allocations
        (student_name, room_no, bed_no, allocation_date)
        VALUES (?, ?, ?, ?)
    `;

    const values = [
        student_name,
        room_no,
        bed_no,
        allocation_date
    ];

    db.query(sql, values, (err, result) => {

        if (err) {
            console.log("ADD allocation error:", err.message);

            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Room allocated successfully",
            id: result.insertId
        });
    });

});
// ======================================
//              FEES
// ======================================


app.get("/api/fees", (req,res)=>{

    const sql = `
    SELECT * FROM fees
    ORDER BY id DESC
    `;


    db.query(sql,(err,result)=>{

        if(err){
            return res.json({
                success:false,
                message:err.message
            });
        }


        res.json({
            success:true,
            data:result
        });

    });

});



app.post("/api/fees",(req,res)=>{

    const {
        student_id,
        amount,
        payment_date,
        status,
        payment_method
    } = req.body;


    const sql = `
    INSERT INTO fees
    (student_id, amount, payment_date, status, payment_method)
    VALUES (?,?,?,?,?)
    `;


    db.query(
        sql,
        [
            student_id,
            amount,
            payment_date,
            status,
            payment_method
        ],
        (err,result)=>{


            if(err){
                return res.json({
                    success:false,
                    message:err.message
                });
            }


            res.json({
                success:true,
                message:"Fee Added Successfully"
            });

        }
    );


});
// ===============================
// SERVER START
// ===============================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});
// =========================
// COMPLAINTS
// =========================

// GET Complaints
app.get("/api/complaints", (req, res) => {

    const sql = `
        SELECT
            complaints.id,
            students.name AS student_name,
            complaints.subject,
            complaints.description AS complaint,
            complaints.status,
            complaints.complaint_date
        FROM complaints
        LEFT JOIN students
        ON complaints.student_id = students.id
        ORDER BY complaints.id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log("GET complaints error:", err.message);

            return res.status(500).json([]);
        }

        res.json(result);
    });
});


// ADD Complaint
app.post("/api/complaints", (req, res) => {

    const {
        student_name,
        subject,
        complaint
    } = req.body;


    if (!student_name || !subject || !complaint) {

        return res.status(400).json({
            success: false,
            message: "Please fill all fields"
        });
    }


    // Student ka ID name se find karo
    const findStudentSql = `
    SELECT id
    FROM students
    WHERE LOWER(TRIM(name)) = LOWER(TRIM(?))
    LIMIT 1
`;


    db.query(
        findStudentSql,
        [student_name],
        (err, students) => {

            if (err) {

                console.log(
                    "Find student error:",
                    err.message
                );

                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }


            if (students.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Student not found"
                });
            }


            const studentId = students[0].id;


            // Complaint insert karo
            const insertSql = `
                INSERT INTO complaints
                (student_id, subject, description, status, complaint_date)
                VALUES (?, ?, ?, 'Pending', CURDATE())
            `;


            db.query(
                insertSql,
                [
                    studentId,
                    subject,
                    complaint
                ],
                (err, result) => {

                    if (err) {

                        console.log(
                            "ADD complaint error:",
                            err.message
                        );

                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }


                    res.json({
                        success: true,
                        message: "Complaint submitted successfully",
                        id: result.insertId
                    });
                }
            );
        }
    );
});
// =========================
// VISITORS
// =========================

// GET Visitors
app.get("/api/visitors", (req, res) => {

    const sql = `
        SELECT
            id,
            visitor_name,
            student_name,
            phone,
            purpose,
            visit_date,
            visit_time
        FROM visitors
        ORDER BY id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {

            console.log("GET visitors error:", err.message);

            return res.status(500).json([]);

        }

        res.json(result);

    });

});
// ADD VISITOR
app.post("/api/visitors", (req, res) => {

    const {
        visitor_name,
        student_name,
        phone,
        purpose,
        visit_date,
        visit_time
    } = req.body;

    if (
        !visitor_name ||
        !student_name ||
        !phone ||
        !purpose ||
        !visit_date ||
        !visit_time
    ) {
        return res.status(400).json({
            success: false,
            message: "Please fill all fields"
        });
    }

    const sql = `
        INSERT INTO visitors
        (visitor_name, student_name, phone, purpose, visit_date, visit_time)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
        visitor_name,
        student_name,
        phone,
        purpose,
        visit_date,
        visit_time
    ];

    db.query(sql, values, (err, result) => {

        if (err) {

            console.log(
                "ADD visitor error:",
                err.message
            );

            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Visitor added successfully",
            id: result.insertId
        });

    });

});
// =====================================================
// NOTICES
// =====================================================

// GET NOTICES
app.get("/api/notices", (req, res) => {

    const sql = `
        SELECT *
        FROM notices
        ORDER BY id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log("GET notices error:", err.message);

            return res.status(500).json([]);
        }

        res.json(result);
    });
});
// ADD NOTICE
app.post("/api/notices", (req, res) => {

    const {
        title,
        notice_date,
        message
    } = req.body;

    if (!title || !notice_date || !message) {

        return res.status(400).json({
            success: false,
            message: "Please fill all fields"
        });
    }

    const sql = `
        INSERT INTO notices
        (title, notice_date, message)
        VALUES (?, ?, ?)
    `;

    const values = [
        title,
        notice_date,
        message
    ];

    db.query(sql, values, (err, result) => {

        if (err) {
            console.log("ADD notice error:", err.message);

            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Notice published successfully",
            id: result.insertId
        });
    });
});
// ===============================
// CONTACTS
// ===============================

// GET Contacts
app.get("/api/contacts", (req, res) => {

    const sql = `
        SELECT
            id,
            name,
            email,
            subject,
            message,
            created_at
        FROM contacts
        ORDER BY id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log("GET contacts error:", err.message);
            return res.status(500).json([]);
        }

        res.json(result);
    });
});


// ADD Contact
app.post("/api/contacts", (req, res) => {

    const {
        name,
        email,
        subject,
        message
    } = req.body;

    const sql = `
        INSERT INTO contacts
        (name, email, subject, message)
        VALUES (?, ?, ?, ?)
    `;

    const values = [
        name,
        email,
        subject,
        message
    ];

    db.query(sql, values, (err, result) => {

        if (err) {
            console.log("ADD contact error:", err.message);

            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Message sent successfully",
            id: result.insertId
        });
    });
});