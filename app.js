   let students = JSON.parse(localStorage.getItem('students')) || [];
        let editIndex = null;

        // Initialize application
        document.addEventListener('DOMContentLoaded', () => {
            renderStudents();
        });

        // Form submission handler
        document.getElementById('studentForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const student = {
                name: document.getElementById('name').value.trim(),
                studentId: document.getElementById('studentId').value,
                email: document.getElementById('email').value.trim(),
                contact: document.getElementById('contact').value
            };

            if (validateStudent(student)) {
                if (editIndex !== null) {
                    students[editIndex] = student;
                    editIndex = null;
                } else {
                    students.push(student);
                }
                localStorage.setItem('students', JSON.stringify(students));
                renderStudents();
                e.target.reset();
            }
        });

        function validateStudent(student) {
            // Validation checks
            if (!student.name.match(/^[A-Za-z\s]+$/)) {
                alert('Name should contain only letters');
                return false;
            }
            if (isNaN(student.studentId)) {
                alert('ID  should be numbers');
                return false;
            }
            if (!student.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                alert('Invalid email format');
                return false;
            }
            if (!student.contact.match(/^\d+$/)) {
                alert('Contact number should contain only numbers');
                return false;
            }
             if (!student.contact.leanth > 10 || student.contact.length < 10) {
                alert('Contact number should be 10 digits long');
                return false;
            }
            return true;
        }

        function renderStudents() {
            const tbody = document.getElementById('studentList');
            tbody.innerHTML = '';

            students.forEach((student, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.name}</td>
                    <td>${student.studentId}</td>
                    <td>${student.email}</td>
                    <td>${student.contact}</td>
                    <td class="actions">
                        <button class="btn-edit" onclick="editStudent(${index})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-delete" onclick="deleteStudent(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }

        function deleteStudent(index) {
            if (confirm('Are you sure you want to delete this student?')) {
                students.splice(index, 1);
                localStorage.setItem('students', JSON.stringify(students));
                renderStudents();
            }
        }

        function editStudent(index) {
            const student = students[index];
            document.getElementById('name').value = student.name;
            document.getElementById('studentId').value = student.studentId;
            document.getElementById('email').value = student.email;
            document.getElementById('contact').value = student.contact;
            editIndex = index;
        }
