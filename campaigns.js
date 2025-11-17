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
    const imageSelector = document.getElementById('image-selector');
    const imageDisplay = document.getElementById('image-display');
    let currentCampaign = 'common'; // Keep track of the current campaign

    const displayImage = (imageName) => {
        imageDisplay.innerHTML = ''; // Clear existing image

        const img = document.createElement('img');
        img.src = `assets/Ads/${currentCampaign}/${imageName}`;
        img.alt = imageName;
        img.classList.add('max-w-full', 'h-auto', 'rounded-lg', 'shadow-md');

        const p = document.createElement('p');
        p.textContent = imageName;
        p.classList.add('text-sm', 'text-gray-600', 'mt-2');

        imageDisplay.appendChild(img);
        imageDisplay.appendChild(p);
    };

    const updateImageSelector = (campaignType) => {
        imageSelector.innerHTML = ''; // Clear existing options
        currentCampaign = campaignType;

        const images = campaigns[campaignType];
        if (images) {
            images.forEach(imageName => {
                const option = document.createElement('option');
                option.value = imageName;
                option.textContent = imageName;
                imageSelector.appendChild(option);
            });
            // Display the first image by default
            displayImage(images[0]);
        }
    };

    campaignSelector.addEventListener('click', (event) => {
        if (event.target.classList.contains('campaign-btn')) {
            const campaignType = event.target.dataset.campaign;
            updateImageSelector(campaignType);

            // Optional: Add active state to the button
            document.querySelectorAll('.campaign-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
        }
    });

    imageSelector.addEventListener('change', (event) => {
        displayImage(event.target.value);
    });

    // Initially render the 'common' campaign
    updateImageSelector('common');
    campaignSelector.querySelector('[data-campaign="common"]').classList.add('active');
});
