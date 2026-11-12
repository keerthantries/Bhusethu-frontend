document.addEventListener('DOMContentLoaded', () => {
    // NOTE: Ensure your HTML form has id="contactForm"
    // e.g., <form action="#" method="POST" id="contactForm">
    const form = document.querySelector('#contactForm'); // Select the form element
    
    // You need to ensure a place for the messages exists in your HTML,
    // e.g., <div class="form-message"></div> somewhere near the form.
    const messageBox = document.querySelector('.form-message'); 

    if (!form) {
        console.error("Form element not found. Please ensure the form is present.");
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Extract values using the 'name' attributes from the HTML form
        const name = form.elements.client_name?.value.trim();
        const email = form.elements.client_email?.value.trim();
        const phone = form.elements.client_phone?.value.trim() || 'no-number';
        
        const serviceType = form.elements.service_type?.value.trim();
        const clientMessage = form.elements.client_message?.value.trim();
        
        // 2. Define the 'message' content for the API payload
        // The API expects a 'message' field. We combine service type and message text.
        let message = '';

        if (clientMessage) {
            // Include the service type in the message text for context
            message = `Service: ${serviceType || 'Not Selected'}. Details: ${clientMessage}`;
        } else if (serviceType) {
             message = `Service Selected: ${serviceType}`;
        } else {
             message = 'no-message';
        }

        // console.log({ name, email, phone, message, captchaToken });

        // 3. Basic Validation Check
        if (!messageBox) {
             // Fallback if messageBox isn't available
             console.error("Message box element (.form-message) not found.");
        }

        if (!name || !email || !phone || serviceType === "") {
            if(messageBox) {
                messageBox.textContent = 'Please fill in your Name, Email, Phone, and select a Service.';
                messageBox.style.color = '#d32f2f';
            }
            return;
        }

        const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!emailRegex.test(email)) {
            if(messageBox) {
                messageBox.textContent = 'Please enter a valid email address.';
                messageBox.style.color = '#d32f2f';
            }
            return;
        }

        if(messageBox) {
            messageBox.textContent = 'Sending...';
            messageBox.style.color = '#333';
        }


        // 4. Send Data to API
        try {
            if (!window.bhusethuApi) throw new Error('HTTP client unavailable');
            const result = await window.bhusethuApi.post('https://bhusethu-form.vercel.app/api/sendd-email', {
                name, email, phone, message, token: captchaToken
            });

            if (result.ok) {
                if(messageBox) {
                    messageBox.textContent = '✅ Message sent successfully! We will get back to you soon.';
                    messageBox.style.color = '#2e7d32';
                }
                form.reset();
            } else {
                if(messageBox) {
                    messageBox.textContent = `❌ Failed to send message. Server says: ${result.error || 'Unknown error'}`;
                    messageBox.style.color = '#d32f2f';
                }
            }
        } catch (error) {
            if(messageBox) {
                messageBox.textContent = '❌ An error occurred. Please try again.';
                messageBox.style.color = '#d32f2f';
            }
            console.error('Fetch error:', error);
        }
    });
});

let captchaToken = '';

function onSuccess(token) {
    captchaToken = token; 
}
