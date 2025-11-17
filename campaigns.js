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
    const imageContainer = document.getElementById('image-container');

    const renderImages = (campaignType) => {
        imageContainer.innerHTML = ''; // Clear existing images

        const images = campaigns[campaignType];
        if (images) {
            images.forEach(imageName => {
                const imageWrapper = document.createElement('div');
                imageWrapper.classList.add('text-center');

                const img = document.createElement('img');
                img.src = `assets/Ads/${campaignType}/${imageName}`;
                img.alt = imageName;
                img.classList.add('w-full', 'h-auto', 'rounded-lg', 'shadow-md');

                const p = document.createElement('p');
                p.textContent = imageName;
                p.classList.add('text-sm', 'text-gray-600', 'mt-2');

                imageWrapper.appendChild(img);
                imageWrapper.appendChild(p);
                imageContainer.appendChild(imageWrapper);
            });
        }
    };

    campaignSelector.addEventListener('click', (event) => {
        if (event.target.classList.contains('campaign-btn')) {
            const campaignType = event.target.dataset.campaign;
            renderImages(campaignType);

            // Optional: Add active state to the button
            document.querySelectorAll('.campaign-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
        }
    });

    // Initially render the 'common' campaign
    renderImages('common');
    campaignSelector.querySelector('[data-campaign="common"]').classList.add('active');
});
