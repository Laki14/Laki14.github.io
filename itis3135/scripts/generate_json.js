/**
 * generate_json.js
 * Generates JSON output from the Introduction Form
 */

document.addEventListener('DOMContentLoaded', function() {
    const jsonBtn = document.getElementById('jsonBtn');
    
    jsonBtn.addEventListener('click', function() {
        generateJSON();
    });
});

/**
 * Generate JSON from form data and display it
 */
function generateJSON() {
    const form = document.getElementById('intro-form');
    const formContainer = document.getElementById('form-container');
    const resultContainer = document.getElementById('result-container');
    const introResult = document.getElementById('intro-result');
    const pageTitle = document.getElementById('page-title');
    
    // Validate form first
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
    
    if (!isValid) {
        alert('Please fill in all required fields before generating JSON.');
        return;
    }
    
    // Collect form data
    const data = collectFormData();
    
    // Create JSON object
    const jsonData = {
        first_name: data.firstName,
        preferred_name: data.nickname || null,
        middle_initial: data.middleName || null,
        last_name: data.lastName,
        divider: data.divider,
        mascot_adjective: data.mascotAdjective,
        mascot_animal: data.mascotAnimal,
        acknowledgment: data.acknowledgment,
        acknowledgment_date: data.acknowledgmentDate,
        image: data.imageUrl,
        image_caption: data.imageCaption,
        personal_statement: data.personalStatement,
        personal_background: data.bullet1,
        professional_background: data.bullet2,
        academic_background: data.bullet3,
        subject_background: data.bullet4,
        primary_computer: data.bullet5,
        problem_solving: data.bullet6,
        professional_goals: data.bullet7,
        courses: data.courses.map(course => ({
            department: course.department,
            number: course.number,
            name: course.name,
            reason: course.reason
        })),
        quote: {
            text: data.quote,
            author: data.quoteAuthor
        },
        funny_thing: data.funnyThing || null,
        share_item: data.shareItem || null,
        links: data.links.map(link => ({
            name: link.name,
            href: link.url
        }))
    };
    
    // Format JSON with indentation
    const jsonString = JSON.stringify(jsonData, null, 2);
    
    // Create HTML with syntax highlighted code
    const html = `
        <h3>Introduction JSON Data</h3>
        <p>Below is your introduction data in JSON format. You can copy this and use it in other applications.</p>
        
        <section class="code-section">
            <pre><code class="language-json">${escapeHtml(jsonString)}</code></pre>
        </section>
        
        <button onclick="copyToClipboard()" style="margin-top: 15px; padding: 10px 20px; background-color: #f39c12; color: #1a1a2e; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
            Copy JSON to Clipboard
        </button>
    `;
    
    // Display result
    introResult.innerHTML = html;
    formContainer.classList.add('hidden');
    resultContainer.classList.add('active');
    pageTitle.textContent = 'Introduction JSON';
    
    // Apply syntax highlighting
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }
}

/**
 * Escape HTML characters for safe display
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Copy JSON to clipboard
 */
function copyToClipboard() {
    const codeElement = document.querySelector('.code-section code');
    const text = codeElement.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        alert('JSON copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('JSON copied to clipboard!');
    });
}
