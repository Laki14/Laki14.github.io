/**
 * introduction.js
 * Core JavaScript functionality for the Introduction Form
 * Handles form submission, validation, clearing, and course management
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Get form elements
    const form = document.getElementById('intro-form');
    const formContainer = document.getElementById('form-container');
    const resultContainer = document.getElementById('result-container');
    const introResult = document.getElementById('intro-result');
    const pageTitle = document.getElementById('page-title');
    const clearBtn = document.getElementById('clearBtn');
    const imageUpload = document.getElementById('imageUpload');
    const imageUrl = document.getElementById('imageUrl');
    const imagePreview = document.getElementById('imagePreview');
    
    // Course counter for adding new courses
    let courseCount = 2;
    
    // Prevent default form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate required fields
        if (!validateForm()) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Generate and display the introduction
        displayIntroduction();
    });
    
    // Clear button functionality
    clearBtn.addEventListener('click', function() {
        clearForm();
    });
    
    // Image upload preview
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                imagePreview.src = event.target.result;
                imageUrl.value = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Image URL change preview
    imageUrl.addEventListener('change', function() {
        imagePreview.src = this.value;
    });
    
    /**
     * Validate the form - check all required fields
     */
    function validateForm() {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#e94560';
                isValid = false;
            } else {
                field.style.borderColor = '#0f3460';
            }
        });
        
        return isValid;
    }
    
    /**
     * Clear all form fields
     */
    function clearForm() {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (input.type !== 'file') {
                input.value = '';
            }
        });
        imagePreview.src = '';
    }
    
    /**
     * Display the introduction result
     */
    function displayIntroduction() {
        const data = collectFormData();
        
        let html = `
            <h3>${data.firstName} ${data.middleName ? data.middleName + ' ' : ''}${data.nickname ? '"' + data.nickname + '" ' : ''}${data.lastName} ${data.divider} ${data.mascotAdjective} ${data.mascotAnimal}</h3>
            
            <figure>
                <img src="${data.imageUrl}" alt="${data.imageCaption}" width="200">
                <figcaption>${data.imageCaption}</figcaption>
            </figure>
            
            <p>${data.personalStatement}</p>
            
            <ul>
                <li><strong>Personal Background:</strong> ${data.bullet1}</li>
                <li><strong>Professional Background:</strong> ${data.bullet2}</li>
                <li><strong>Academic Background:</strong> ${data.bullet3}</li>
                <li><strong>Subject Background:</strong> ${data.bullet4}</li>
                <li><strong>Primary Computer:</strong> ${data.bullet5}</li>
                <li><strong>Problem-Solving:</strong> ${data.bullet6}</li>
                <li><strong>Professional Goals:</strong> ${data.bullet7}</li>
            </ul>
            
            <h3>Courses I am taking:</h3>
            <ol>
        `;
        
        // Add courses
        data.courses.forEach(course => {
            html += `
                <li>${course.department} ${course.number} - ${course.name}
                    <ul>
                        <li>Reason: ${course.reason}</li>
                    </ul>
                </li>
            `;
        });
        
        html += `</ol>`;
        
        // Add quote
        html += `
            <blockquote>
                "${data.quote}"
                <cite>– ${data.quoteAuthor}</cite>
            </blockquote>
        `;
        
        // Add optional items if provided
        if (data.funnyThing) {
            html += `<p><strong>Funny thing about me:</strong> ${data.funnyThing}</p>`;
        }
        
        if (data.shareItem) {
            html += `<p><strong>Something I'd like to share:</strong> ${data.shareItem}</p>`;
        }
        
        // Add links
        html += `
            <h3>Connect with me:</h3>
            <nav>
        `;
        
        data.links.forEach((link, index) => {
            html += `<a href="${link.url}" target="_blank" rel="noopener">${link.name}</a>`;
            if (index < data.links.length - 1) {
                html += ' | ';
            }
        });
        
        html += `</nav>`;
        
        // Display result
        introResult.innerHTML = html;
        formContainer.classList.add('hidden');
        resultContainer.classList.add('active');
        pageTitle.textContent = 'Introduction';
    }
    
    // Make functions globally accessible
    window.validateForm = validateForm;
    window.clearForm = clearForm;
    window.displayIntroduction = displayIntroduction;
});

/**
 * Collect all form data into an object
 */
function collectFormData() {
    const form = document.getElementById('intro-form');
    
    const data = {
        firstName: document.getElementById('firstName').value,
        middleName: document.getElementById('middleName').value,
        nickname: document.getElementById('nickname').value,
        lastName: document.getElementById('lastName').value,
        mascotAdjective: document.getElementById('mascotAdjective').value,
        mascotAnimal: document.getElementById('mascotAnimal').value,
        divider: document.getElementById('divider').value,
        acknowledgment: document.getElementById('acknowledgment').value,
        acknowledgmentDate: document.getElementById('acknowledgmentDate').value,
        imageUrl: document.getElementById('imageUrl').value,
        imageCaption: document.getElementById('imageCaption').value,
        personalStatement: document.getElementById('personalStatement').value,
        bullet1: document.getElementById('bullet1').value,
        bullet2: document.getElementById('bullet2').value,
        bullet3: document.getElementById('bullet3').value,
        bullet4: document.getElementById('bullet4').value,
        bullet5: document.getElementById('bullet5').value,
        bullet6: document.getElementById('bullet6').value,
        bullet7: document.getElementById('bullet7').value,
        quote: document.getElementById('quote').value,
        quoteAuthor: document.getElementById('quoteAuthor').value,
        funnyThing: document.getElementById('funnyThing').value,
        shareItem: document.getElementById('shareItem').value,
        courses: [],
        links: []
    };
    
    // Collect courses
    const courseEntries = document.querySelectorAll('.course-entry');
    courseEntries.forEach((entry, index) => {
        const courseNum = index + 1;
        const dept = form.querySelector(`[name="courseDept${courseNum}"]`);
        const num = form.querySelector(`[name="courseNum${courseNum}"]`);
        const name = form.querySelector(`[name="courseName${courseNum}"]`);
        const reason = form.querySelector(`[name="courseReason${courseNum}"]`);
        
        if (dept && num && name && reason) {
            data.courses.push({
                department: dept.value,
                number: num.value,
                name: name.value,
                reason: reason.value
            });
        }
    });
    
    // Collect links
    for (let i = 1; i <= 5; i++) {
        const linkName = form.querySelector(`[name="linkName${i}"]`);
        const linkUrl = form.querySelector(`[name="linkUrl${i}"]`);
        
        if (linkName && linkUrl) {
            data.links.push({
                name: linkName.value,
                url: linkUrl.value
            });
        }
    }
    
    return data;
}

/**
 * Add a new course entry
 */
function addCourse() {
    const container = document.getElementById('courses-container');
    const courseEntries = container.querySelectorAll('.course-entry');
    const newCourseNum = courseEntries.length + 1;
    
    const courseHtml = `
        <div class="course-entry" data-course="${newCourseNum}">
            <h4>Course ${newCourseNum}</h4>
            <button type="button" class="btn-delete" onclick="deleteCourse(this)">Delete</button>
            <div class="form-row">
                <div class="form-group">
                    <label>Department *</label>
                    <input type="text" name="courseDept${newCourseNum}" placeholder="e.g., ITIS" required>
                </div>
                <div class="form-group">
                    <label>Number *</label>
                    <input type="text" name="courseNum${newCourseNum}" placeholder="e.g., 3135" required>
                </div>
            </div>
            <div class="form-group">
                <label>Course Name *</label>
                <input type="text" name="courseName${newCourseNum}" placeholder="e.g., Web Programming" required>
            </div>
            <div class="form-group">
                <label>Reason for Taking *</label>
                <input type="text" name="courseReason${newCourseNum}" placeholder="Why are you taking this course?" required>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', courseHtml);
    renumberCourses();
}

/**
 * Delete a course entry
 */
function deleteCourse(button) {
    const courseEntry = button.closest('.course-entry');
    const container = document.getElementById('courses-container');
    const courseEntries = container.querySelectorAll('.course-entry');
    
    // Don't allow deleting if only one course remains
    if (courseEntries.length <= 1) {
        alert('You must have at least one course.');
        return;
    }
    
    courseEntry.remove();
    renumberCourses();
}

/**
 * Renumber courses after adding/deleting
 */
function renumberCourses() {
    const container = document.getElementById('courses-container');
    const courseEntries = container.querySelectorAll('.course-entry');
    
    courseEntries.forEach((entry, index) => {
        const num = index + 1;
        entry.dataset.course = num;
        entry.querySelector('h4').textContent = `Course ${num}`;
        
        // Update input names
        const deptInput = entry.querySelector('[name^="courseDept"]');
        const numInput = entry.querySelector('[name^="courseNum"]');
        const nameInput = entry.querySelector('[name^="courseName"]');
        const reasonInput = entry.querySelector('[name^="courseReason"]');
        
        if (deptInput) deptInput.name = `courseDept${num}`;
        if (numInput) numInput.name = `courseNum${num}`;
        if (nameInput) nameInput.name = `courseName${num}`;
        if (reasonInput) reasonInput.name = `courseReason${num}`;
    });
}

/**
 * Reset the form to show the form again
 */
function resetForm() {
    const formContainer = document.getElementById('form-container');
    const resultContainer = document.getElementById('result-container');
    const pageTitle = document.getElementById('page-title');
    const form = document.getElementById('intro-form');
    
    formContainer.classList.remove('hidden');
    resultContainer.classList.remove('active');
    pageTitle.textContent = 'Introduction Form';
    
    // Reset form to default values
    form.reset();
    
    // Reset image preview
    document.getElementById('imagePreview').src = '../Images/LSelvamP3.jpeg';
}
