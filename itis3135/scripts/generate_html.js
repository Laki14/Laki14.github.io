/**
 * generate_html.js
 * Generates HTML code output from the Introduction Form
 */

document.addEventListener('DOMContentLoaded', function() {
    const htmlBtn = document.getElementById('htmlBtn');
    
    htmlBtn.addEventListener('click', function() {
        generateHTML();
    });
});

/**
 * Generate HTML code from form data and display it
 */
function generateHTML() {
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
        alert('Please fill in all required fields before generating HTML.');
        return;
    }
    
    // Collect form data
    const data = collectFormData();
    
    // Build the HTML string
    let htmlCode = `<h2>Introduction</h2>

<h3>${data.firstName} ${data.middleName ? data.middleName + ' ' : ''}${data.nickname ? '"' + data.nickname + '" ' : ''}${data.lastName} ${data.divider} ${data.mascotAdjective} ${data.mascotAnimal}</h3>

<figure>
    <img
        src="${data.imageUrl}"
        alt="${data.imageCaption}"
        width="200"
    />
    <figcaption>${data.imageCaption}</figcaption>
</figure>

<p>${data.personalStatement}</p>

<ul>
    <li>
        <strong>Personal Background:</strong> ${data.bullet1}
    </li>
    <li>
        <strong>Professional Background:</strong> ${data.bullet2}
    </li>
    <li>
        <strong>Academic Background:</strong> ${data.bullet3}
    </li>
    <li>
        <strong>Subject Background:</strong> ${data.bullet4}
    </li>
    <li>
        <strong>Primary Computer:</strong> ${data.bullet5}
    </li>
    <li>
        <strong>Problem-Solving:</strong> ${data.bullet6}
    </li>
    <li>
        <strong>Professional Goals:</strong> ${data.bullet7}
    </li>
</ul>

<h3>Courses I am taking:</h3>
<ol>`;

    // Add courses
    data.courses.forEach(course => {
        htmlCode += `
    <li>${course.department} ${course.number} - ${course.name}
        <ul>
            <li>Reason: ${course.reason}</li>
        </ul>
    </li>`;
    });

    htmlCode += `
</ol>

<blockquote>
    "${data.quote}"
    <br>
    <cite>– ${data.quoteAuthor}</cite>
</blockquote>`;

    // Add optional items if provided
    if (data.funnyThing) {
        htmlCode += `

<p><strong>Funny thing about me:</strong> ${data.funnyThing}</p>`;
    }

    if (data.shareItem) {
        htmlCode += `

<p><strong>Something I'd like to share:</strong> ${data.shareItem}</p>`;
    }

    // Add links
    htmlCode += `

<h3>Connect with me:</h3>
<nav>`;

    data.links.forEach((link, index) => {
        htmlCode += `
    <a href="${link.url}" target="_blank" rel="noopener">${link.name}</a>`;
        if (index < data.links.length - 1) {
            htmlCode += ` |`;
        }
    });

    htmlCode += `
</nav>`;

    // Create display HTML with syntax highlighted code
    const displayHtml = `
        <h3>Introduction HTML Code</h3>
        <p>Below is your introduction data in HTML format. You can copy this code and use it in your own pages.</p>
        
        <section class="code-section">
            <pre><code class="language-html">${escapeHtmlForDisplay(htmlCode)}</code></pre>
        </section>
        
        <button onclick="copyHtmlToClipboard()" style="margin-top: 15px; padding: 10px 20px; background-color: #27ae60; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
            Copy HTML to Clipboard
        </button>
    `;
    
    // Display result
    introResult.innerHTML = displayHtml;
    formContainer.classList.add('hidden');
    resultContainer.classList.add('active');
    pageTitle.textContent = 'Introduction HTML';
    
    // Store the raw HTML for copying
    window.generatedHtmlCode = htmlCode;
    
    // Apply syntax highlighting
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }
}

/**
 * Escape HTML characters for display in code block
 */
function escapeHtmlForDisplay(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Copy HTML to clipboard
 */
function copyHtmlToClipboard() {
    const text = window.generatedHtmlCode;
    
    navigator.clipboard.writeText(text).then(() => {
        alert('HTML copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('HTML copied to clipboard!');
    });
}
