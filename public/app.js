async function apiRequest(url, options = {}) {

    try {

        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json"
            },
            ...options
        });

        const data = await response.json();

        return data;

    } catch (error) {

        console.error("API Error:", error);

        return {
            success: false,
            message: "Server se connection nahi ho raha"
        };
    }
}


/* =========================
   STUDENTS
========================= */

async function loadStudents() {

    const tableBody = document.getElementById("studentTableBody");

    if (!tableBody) return;

    const data = await apiRequest("/api/students");

    if (!Array.isArray(data)) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="error">
                    Students data load nahi ho raha.
                </td>
            </tr>
        `;
        return;
    }

    if (data.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="8">
                    No students found.
                </td>
            </tr>
        `;

        return;
    }

    tableBody.innerHTML = data.map(student => `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.roll_no}</td>
            <td>${student.course}</td>
            <td>${student.year}</td>
            <td>${student.phone}</td>
            <td>${student.email}</td>
            <td>
                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </td>
        </tr>
    `).join("");
}


async function addStudent(event) {

    event.preventDefault();

    const form = document.getElementById("studentForm");
    const message = document.getElementById("studentMessage");

    const formData = new FormData(form);

    const student = {
        name: formData.get("name"),
        roll_no: formData.get("roll_no"),
        course: formData.get("course"),
        year: formData.get("year"),
        phone: formData.get("phone"),
        email: formData.get("email")
    };

    const data = await apiRequest("/api/students", {
        method: "POST",
        body: JSON.stringify(student)
    });

    if (data.success) {

        message.className = "message success";
        message.textContent = data.message;

        form.reset();

        loadStudents();

    } else {

        message.className = "message error";
        message.textContent = data.message || "Student add nahi hua";
    }
}


async function deleteStudent(id) {

    if (!confirm("Student delete karna hai?")) {
        return;
    }

    const data = await apiRequest(`/api/students/${id}`, {
        method: "DELETE"
    });

    if (data.success) {
        loadStudents();
    } else {
        alert(data.message);
    }
}


/* =========================
   ROOMS
========================= */

async function loadRooms() {

    const tableBody = document.getElementById("roomTableBody");

    if (!tableBody) return;

    const data = await apiRequest("/api/rooms");

    if (!Array.isArray(data)) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7">Rooms data load nahi ho raha.</td>
            </tr>
        `;
        return;
    }

    if (data.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="7">No rooms found.</td>
            </tr>
        `;

        return;
    }

    tableBody.innerHTML = data.map(room => `
        <tr>
            <td>${room.id}</td>
            <td>${room.room_no}</td>
            <td>${room.block_name}</td>
            <td>${room.room_type}</td>
            <td>${room.capacity}</td>
            <td>${room.occupied}</td>
            <td>${room.status}</td>
        </tr>
    `).join("");
}


async function addRoom(event) {

    event.preventDefault();

    const form = document.getElementById("roomForm");
    const message = document.getElementById("roomMessage");

    const formData = new FormData(form);

    const room = {
        room_no: formData.get("room_no"),
        block_name: formData.get("block_name"),
        room_type: formData.get("room_type"),
        capacity: formData.get("capacity")
    };

    const data = await apiRequest("/api/rooms", {
        method: "POST",
        body: JSON.stringify(room)
    });

    if (data.success) {

        message.className = "message success";
        message.textContent = data.message;

        form.reset();

        loadRooms();

    } else {

        message.className = "message error";
        message.textContent = data.message;
    }
}

// ==================================================
//                    ALLOCATION
// ==================================================

async function loadAllocations() {

    const tableBody =
        document.getElementById("allocationTableBody");

    if (!tableBody) return;

    const response =
        await apiRequest("/api/allocations");

    if (!response || response.success === false) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="5">
                    Allocation data load nahi ho raha.
                </td>
            </tr>
        `;

        return;
    }

    const data = response.data || [];

    if (data.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="5">
                    No allocation records found.
                </td>
            </tr>
        `;

        return;
    }

    tableBody.innerHTML = data.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.student_name}</td>
            <td>${item.room_no}</td>
            <td>${item.bed_no}</td>
            <td>${item.allocation_date}</td>
        </tr>
    `).join("");
}


async function addAllocation(event) {

    event.preventDefault();

    const form =
        document.getElementById("allocationForm");

    const message =
        document.getElementById("allocationMessage");

    const formData =
        new FormData(form);

    const allocation = {

        student_name:
            formData.get("student_name"),

        room_no:
            formData.get("room_no"),

        bed_no:
            formData.get("bed_no"),

        allocation_date:
            formData.get("allocation_date")
    };

    const data =
        await apiRequest("/api/allocations", {

            method: "POST",

            body: JSON.stringify(allocation)
        });

    if (data && data.success) {

        message.className =
            "message success";

        message.textContent =
            data.message;

        form.reset();

        loadAllocations();

    } else {

        message.className =
            "message error";

        message.textContent =
            data?.message ||
            "Allocation failed.";
    }
}
// =========================
// ROOMS
// =========================

async function loadRooms() {

    const tableBody =
        document.getElementById("roomTableBody");

    if (!tableBody) return;

    try {

        const data =
            await apiRequest("/api/rooms");

        if (!Array.isArray(data)) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="7">
                        Rooms data load nahi ho raha.
                    </td>
                </tr>
            `;

            return;
        }


        if (data.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="7">
                        No rooms found.
                    </td>
                </tr>
            `;

            return;
        }


        tableBody.innerHTML = data.map(room => `

            <tr>

                <td>${room.id}</td>

                <td>${room.room_no}</td>

                <td>${room.block}</td>

                <td>${room.type}</td>

                <td>${room.capacity}</td>

                <td>${room.occupied || 0}</td>

                <td>
                    ${room.status || "Available"}
                </td>

            </tr>

        `).join("");

    } catch (error) {

        console.error("Load rooms error:", error);

        tableBody.innerHTML = `
            <tr>
                <td colspan="7">
                    Rooms data load nahi ho raha.
                </td>
            </tr>
        `;

    }
}


// =========================
// ADD ROOM
// =========================

async function addRoom(event) {

    event.preventDefault();


    const form =
        document.getElementById("roomForm");

    const message =
        document.getElementById("roomMessage");


    const formData =
        new FormData(form);


    // IMPORTANT:
    // These names must match Rooms.html
    const room = {

        room_no:
            formData.get("room_no"),

        block:
            formData.get("block"),

        type:
            formData.get("type"),

        capacity:
            formData.get("capacity")

    };


    // Check fields

    if (
        !room.room_no ||
        !room.block ||
        !room.type ||
        !room.capacity
    ) {

        message.className =
            "message error";

        message.textContent =
            "Please fill all room fields";

        return;
    }


    try {

        const data =
            await apiRequest(
                "/api/rooms",
                {
                    method: "POST",

                    body: JSON.stringify(room)
                }
            );


        if (data.success) {

            message.className =
                "message success";

            message.textContent =
                data.message ||
                "Room added successfully";


            form.reset();


            loadRooms();

        } else {

            message.className =
                "message error";

            message.textContent =
                data.message ||
                "Room add nahi hua.";

        }

    } catch (error) {

        console.error(
            "Add room error:",
            error
        );

        message.className =
            "message error";

        message.textContent =
            "Server se connection nahi ho raha.";

    }

}

/* =========================
   COMPLAINTS
========================= */

async function loadComplaints() {

    const tableBody = document.getElementById("complaintTableBody");

    if (!tableBody) return;

    const data = await apiRequest("/api/complaints");

    if (!Array.isArray(data)) return;

    tableBody.innerHTML = data.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.student_name}</td>
            <td>${item.subject}</td>
            <td>${item.complaint}</td>
            <td>${item.status}</td>
        </tr>
    `).join("");
}


async function addComplaint(event) {

    event.preventDefault();

    const form = document.getElementById("complaintForm");
    const message = document.getElementById("complaintMessage");

    const formData = new FormData(form);

    const complaint = {
        student_name: formData.get("student_name"),
        subject: formData.get("subject"),
        complaint: formData.get("complaint")
    };

    const data = await apiRequest("/api/complaints", {
        method: "POST",
        body: JSON.stringify(complaint)
    });

    if (data.success) {

        message.className = "message success";
        message.textContent = data.message;

        form.reset();

        loadComplaints();

    } else {

        message.className = "message error";
        message.textContent = data.message;
    }
}


/* =========================
   NOTICES
========================= */

async function loadNotices() {

    const container = document.getElementById("noticeContainer");

    if (!container) return;

    const data = await apiRequest("/api/notices");

    if (!Array.isArray(data)) return;

    if (data.length === 0) {

        container.innerHTML = "<p>No notices available.</p>";

        return;
    }

    container.innerHTML = data.map(notice => `
        <div class="card">
            <h3>${notice.title}</h3>
            <p>${notice.message}</p>
            <small>${notice.notice_date}</small>
        </div>
    `).join("");
}


async function addNotice(event) {

    event.preventDefault();

    const form = document.getElementById("noticeForm");
    const message = document.getElementById("noticeMessage");

    const formData = new FormData(form);

    const notice = {
        title: formData.get("title"),
        message: formData.get("message"),
        notice_date: formData.get("notice_date")
    };

    const data = await apiRequest("/api/notices", {
        method: "POST",
        body: JSON.stringify(notice)
    });

    if (data.success) {

        message.className = "message success";
        message.textContent = data.message;

        form.reset();

        loadNotices();

    } else {

        message.className = "message error";
        message.textContent = data.message;
    }
}


/* =========================
   VISITORS
========================= */

async function loadVisitors() {

    const tableBody = document.getElementById("visitorTableBody");

    if (!tableBody) return;

    const data = await apiRequest("/api/visitors");

    if (!Array.isArray(data)) return;

    tableBody.innerHTML = data.map(visitor => `
        <tr>
            <td>${visitor.id}</td>
            <td>${visitor.visitor_name}</td>
            <td>${visitor.student_name}</td>
            <td>${visitor.phone}</td>
            <td>${visitor.visit_date}</td>
            <td>${visitor.purpose}</td>
        </tr>
    `).join("");
}


async function addVisitor(event) {

    event.preventDefault();

    const form = document.getElementById("visitorForm");
    const message = document.getElementById("visitorMessage");

    const formData = new FormData(form);

    const visitor = {
        visitor_name: formData.get("visitor_name"),
        student_name: formData.get("student_name"),
        phone: formData.get("phone"),
        visit_date: formData.get("visit_date"),
        purpose: formData.get("purpose")
    };

    const data = await apiRequest("/api/visitors", {
        method: "POST",
        body: JSON.stringify(visitor)
    });

    if (data.success) {

        message.className = "message success";
        message.textContent = data.message;

        form.reset();

        loadVisitors();

    } else {

        message.className = "message error";
        message.textContent = data.message;
    }
}


/* =========================
   CONTACT
========================= */

async function sendContact(event) {

    event.preventDefault();

    const form = document.getElementById("contactForm");
    const message = document.getElementById("contactMessage");

    const formData = new FormData(form);

    const contact = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message")
    };

    const data = await apiRequest("/api/contact", {
        method: "POST",
        body: JSON.stringify(contact)
    });

    if (data.success) {

        message.className = "message success";
        message.textContent = data.message;

        form.reset();

    } else {

        message.className = "message error";
        message.textContent = data.message;
    }
}


/* =========================
   PAGE LOAD
========================= */

async function loadStudents() {
    const tableBody = document.getElementById("studentTableBody");

    if (!tableBody) return;

    try {
        const response = await fetch("/api/students");
        const result = await response.json();

        console.log("Students API:", result);

        if (!result.success) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="8" style="color:red;">
                        Students data load nahi ho raha.
                    </td>
                </tr>
            `;
            return;
        }

        const students = result.data;

        if (!students || students.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="8">
                        No students found.
                    </td>
                </tr>
            `;
            return;
        }

        tableBody.innerHTML = students.map(student => `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.roll_no}</td>
                <td>${student.course}</td>
                <td>${student.year}</td>
                <td>${student.phone}</td>
                <td>${student.email}</td>
                <td>
                    <button 
                        onclick="deleteStudent(${student.id})"
                        class="delete-btn">
                        Delete
                    </button>
                </td>
            </tr>
        `).join("");

    } catch (error) {
        console.error("Student loading error:", error);

        tableBody.innerHTML = `
            <tr>
                <td colspan="8" style="color:red;">
                    Students data load nahi ho raha.
                </td>
            </tr>
        `;
    }
}
// LOAD ALLOCATIONS

async function loadAllocations(){

    const table = document.getElementById("allocationTable");

    if(!table) return;


    const response = await fetch(
        "http://localhost:3000/api/allocations"
    );


    const result = await response.json();


    table.innerHTML="";


    result.data.forEach(item=>{

        table.innerHTML += `

        <tr>
            <td>${item.id}</td>
            <td>${item.student_name}</td>
            <td>${item.room_no}</td>
            <td>${item.bed_no}</td>
            <td>${item.allocation_date}</td>
        </tr>

        `;

    });

}
// LOAD ALLOCATIONS

function loadAllocations(){

    fetch("http://localhost:3000/api/allocations")
    .then(res => res.json())
    .then(data => {

        let table = document.getElementById("allocationTable");

        if(!table) return;

        table.innerHTML = "";

        (data.data || []).forEach(item=>{

            table.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.student_name}</td>
                <td>${item.room_no}</td>
                <td>${item.bed_no}</td>
                <td>${item.allocation_date}</td>
            </tr>
            `;

        });

    })

    .catch(err=>{
        console.log(err);
    });

}


window.onload = loadAllocations;
// ================= FEES =================

function loadFees(){

fetch("http://localhost:3000/api/fees")

.then(res=>res.json())

.then(data=>{

console.log(data);

let table=document.getElementById("feeTableBody");


table.innerHTML="";


data.data.forEach(item=>{


table.innerHTML += `
<tr>
<td>${item.id}</td>
<td>${item.student_id}</td>
<td>${item.amount}</td>
<td>${item.fee_type || "N/A"}</td>
<td>${item.status}</td>
<td>${item.payment_date ? item.payment_date.substring(0,10) : "N/A"}</td>
</tr>
`;

});
// =======================
// ADD FEE RECORD
// =======================

let feeForm = document.getElementById("feeForm");

if(feeForm){

feeForm.addEventListener("submit", function(e){

e.preventDefault();


let formData = new FormData(feeForm);


let data = {

student_id: formData.get("student_id"),

amount: formData.get("amount"),

fee_type: formData.get("fee_type"),

payment_date: formData.get("payment_date"),

status: formData.get("status"),

payment_method: formData.get("payment_method")

};



fetch("http://localhost:3000/api/fees",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

})


.then(res=>res.json())

.then(result=>{

console.log(result);

alert("Fee Record Added Successfully");


feeForm.reset();

loadFees();

})


.catch(error=>{

console.log(error);

alert("Fee add nahi hua");

});


});

}

})

.catch(err=>{

console.log("API ERROR",err);

});

}
const feeForm = document.getElementById("feeForm");

if (feeForm) {
    feeForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const student_id = document.getElementById("student_id").value;
        const amount = document.getElementById("amount").value;
        const fee_type = document.getElementById("fee_type").value;
        const status = document.getElementById("status").value;
        const payment_method = document.getElementById("payment_method").value;
        const payment_date = document.getElementById("payment_date").value;

        const data = {
            student_id: student_id,
            amount: amount,
            fee_type: fee_type,
            status: status,
            payment_method: payment_method,
            payment_date: payment_date
        };

        console.log("Fee Data:", data);
        console.log(data.fee_type);
console.log(data.status);

        const result = await apiRequest("/api/fees", {
            method: "POST",
            body: JSON.stringify(data)
        });

        console.log("Fee Result:", result);

        if (result.success) {
            alert("Fee record added successfully!");
            feeForm.reset();
            loadFees();
        } else {
            alert("Error: " + (result.error || result.message));
        }
    });
}
// =========================
// NOTICES
// =========================

async function loadNotices() {

    const container = document.getElementById("noticeContainer");

    if (!container) return;

    const data = await apiRequest("/api/notices");

    if (!Array.isArray(data)) {
        container.innerHTML = "No notices found.";
        return;
    }

    if (data.length === 0) {
        container.innerHTML = "No notices published yet.";
        return;
    }

    container.innerHTML = data.map(item => `
        <div class="notice-card">
            <h3>${item.title}</h3>
            <p><strong>Date:</strong> ${item.notice_date}</p>
            <p>${item.message}</p>
        </div>
    `).join("");
}
if (document.getElementById("noticeContainer")) {
    loadNotices();
}
// =========================
// VISITORS
// =========================

async function loadVisitors() {

    const tableBody = document.getElementById("visitorTableBody");

    if (!tableBody) return;

    const data = await apiRequest("/api/visitors");

    if (!Array.isArray(data)) return;

    tableBody.innerHTML = data.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.visitor_name}</td>
            <td>${item.student_name}</td>
            <td>${item.phone}</td>
            <td>${item.purpose}</td>
            <td>${item.visit_date}</td>
            <td>${item.visit_time}</td>
        </tr>
    `).join("");
}


async function addVisitor(event) {

    event.preventDefault();

    const form = document.getElementById("visitorForm");

    const message = document.getElementById("visitorMessage");

    const formData = new FormData(form);

    const visitor = {

        visitor_name: formData.get("visitor_name"),

        student_name: formData.get("student_name"),

        phone: formData.get("phone"),

        purpose: formData.get("purpose"),

        visit_date: formData.get("visit_date"),

        visit_time: formData.get("visit_time")

    };

    const data = await apiRequest("/api/visitors", {

        method: "POST",

        body: JSON.stringify(visitor)

    });

    if (data.success) {

        message.className = "message success";

        message.textContent = data.message;

        form.reset();

        loadVisitors();

    } else {

        message.className = "message error";

        message.textContent = data.message;

    }

}
const visitorForm = document.getElementById("visitorForm");

if (visitorForm) {

    visitorForm.addEventListener("submit", addVisitor);

    loadVisitors();

}
// =========================
// CONTACT
// =========================

async function sendContact(event) {

    event.preventDefault();

    const form = document.getElementById("contactForm");
    const messageBox = document.getElementById("contactMessage");

    const formData = new FormData(form);

    const contact = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message")
    };

    const data = await apiRequest("/api/contacts", {
        method: "POST",
        body: JSON.stringify(contact)
    });

    if (data.success) {

        messageBox.className = "message success";
        messageBox.textContent = data.message;

        form.reset();

    } else {

        messageBox.className = "message error";
        messageBox.textContent = data.message;

    }
}