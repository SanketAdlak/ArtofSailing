document.addEventListener('DOMContentLoaded', () => {
    const campaigns = {
        common: [
            'authority.png',
            'problem-solution.png',
            'testimonial.png',
            'urgency.png'
        ],
        Events: [
            'demo-day.png',
            'event-startup-india.png',
            'funding-season.png',
            'pitch-day.png'
        ],
        milestone: [
            'exit.png',
            'launch.png',
            'pivot.png',
            'scale.png'
        ],
        seasonal: [
            'mid-year.png',
            'new-year.png',
            'Q1-planning.png',
            'Q4-sprint.png'
        ]
    };

    const campaignSelector = document.getElementById('campaign-selector');
    const imageSelectorButtons = document.getElementById('image-selector-buttons'); // Changed ID
    const imageDisplay = document.getElementById('image-display');
    let currentCampaign = 'common'; // Keep track of the current campaign

    const displayImage = (imageName) => {
        imageDisplay.innerHTML = ''; // Clear existing image

        const img = document.createElement('img');
        img.src = `assets/Ads/${currentCampaign}/${imageName}`;
        img.alt = imageName;
        img.classList.add('max-w-full', 'h-auto', 'rounded-lg', 'shadow-md');

        // Optional: Add a caption for the image
        const p = document.createElement('p');
        p.textContent = imageName.replace(/\.png$/, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()); // Format name
        p.classList.add('text-sm', 'text-gray-600', 'mt-2');

        imageDisplay.appendChild(img);
        imageDisplay.appendChild(p);
    };

    const updateImageButtons = (campaignType) => { // Renamed function
        imageSelectorButtons.innerHTML = ''; // Clear existing buttons
        currentCampaign = campaignType;

        const images = campaigns[campaignType];
        if (images) {
            images.forEach(imageName => {
                const button = document.createElement('button');
                button.classList.add('campaign-btn', 'image-select-btn'); // Add a new class for image buttons
                button.textContent = imageName.replace(/\.png$/, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()); // Format name for button text
                button.dataset.image = imageName; // Store image name in data attribute

                button.addEventListener('click', () => {
                    displayImage(imageName);
                    // Update active state for image buttons
                    document.querySelectorAll('.image-select-btn').forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                });
                imageSelectorButtons.appendChild(button);
            });
            // Display the first image by default and set its button as active
            if (images.length > 0) {
                displayImage(images[0]);
                imageSelectorButtons.querySelector(`[data-image="${images[0]}"]`).classList.add('active');
            }
        }
    };

    campaignSelector.addEventListener('click', (event) => {
        if (event.target.classList.contains('campaign-btn')) {
            const campaignType = event.target.dataset.campaign;
            updateImageButtons(campaignType); // Call renamed function

            // Update active state for campaign type buttons
            document.querySelectorAll('.campaign-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
        }
    });

    // Removed: imageSelector.addEventListener('change', ...)

    // Initially render the 'common' campaign
    updateImageButtons('common'); // Call renamed function
    campaignSelector.querySelector('[data-campaign="common"]').classList.add('active');
});