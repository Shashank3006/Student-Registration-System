      
      //declare variables localStorage its used to store data like dummy data base
      let students = JSON.parse(localStorage.getItem('students')) || [];
      //declear variable edit index its help when we edit the datd
        let editIndex = null;

        // Initialize  event listeners
        // This event listener is triggered when the DOM content is fully loaded
        // It ensures that the renderStudents function is called to display the list of students
        document.addEventListener('DOMContentLoaded', () => {
            renderStudents();
        });

        // Form submission handler
        //when submit button is clicked, get data from the form and store it in the student object
        document.getElementById('studentForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const student = {
                name: document.getElementById('name').value.trim(),
                studentId: document.getElementById('studentId').value,
                email: document.getElementById('email').value.trim(),
                contact: document.getElementById('contact').value
            };
//check if the student object is valid
            if (validateStudent(student)) {
                //check if index valeue not null the will work other then else condition will be work
                if (editIndex !== null) {
                    students[editIndex] = student;
                    editIndex = null;
                } else {
                    students.push(student);
                }
                // Store the data in localStorage define variable students
                localStorage.setItem('students', JSON.stringify(students));
                renderStudents();
                e.target.reset();
            }
        });
//function to validate the student object
        // This function checks if the student object has valid data
        function validateStudent(student) {
            // Check if the name contains only letters
            if (!student.name.match(/^[A-Za-z\s]+$/)) {
                alert('Name should contain only letters');
                return false;
            }
            // Check if the studentId is a number
            if (isNaN(student.studentId)) {
                alert('ID  should be numbers');
                return false;
            }
            // Check if the email is in a valid format
            if (!student.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                alert('Invalid email format');
                return false;
            }
            // Check if the contact number is a valid number
            if (!student.contact.match(/^\d+$/)) {
                alert('Contact number should contain only numbers');
                return false;
            }
            // Check if the contact number is 10 digits long
             if (student.contact.length !== 10) {
                alert('Contact number should be 10 digits long');
                return false;
            }
            //if all validations pass, return true
            return true;
        }
        // This function renders the list of students in the table
        function renderStudents() {
            const tbody = document.getElementById('studentList');
            tbody.innerHTML = '';
            // Loop through the students array and create table rows for each student
            // The index is used to identify the student for editing or deleting
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
// This function deletes a student from the list
        function deleteStudent(index) {
            if (confirm('Are you sure you want to delete this student?')) {
                students.splice(index, 1);
                localStorage.setItem('students', JSON.stringify(students));
                renderStudents();
            }
        }
// This function work edit tha data,
//using index data fill to the form and perfome tast to edit after that save 
        function editStudent(index) {
            const student = students[index];
            document.getElementById('name').value = student.name;
            document.getElementById('studentId').value = student.studentId;
            document.getElementById('email').value = student.email;
            document.getElementById('contact').value = student.contact;
            editIndex = index;
        }
