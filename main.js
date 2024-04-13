// Created: 4/12/2024
// Updated:
const activities = [];
let currentIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    fetch('info.json')
        .then(response => response.json())
        .then(data => {

            // Iterate through the object properties
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    // Create a new object for each activity
                    const activity = {
                        name: data[key].name,
                        img_src: data[key].img_src,
                        description: data[key].description,
                        mapLink: data[key].mapLink,
                        youtube_link: data[key].youtube_link,
                        intensity: data[key].intensity,
                        selected: data[key].selected
                    };

                    // Add the activity object to the activities array
                    activities.push(activity);
                }
            }

            console.log(activities);

            // Call the propagate function with the activities array
            propagate(activities, 0);

            // Set up the event listener for the "Next" button
            document.getElementById("next").addEventListener("click", () => {
                currentIndex = (currentIndex + 1) % activities.length;
                propagate(activities, currentIndex);
            });
        })
        // .catch(error => {
        //     console.error('Error:', error);
        // });

    let currentIndex = 0;

    function propagate(activities, index) {
        const desc = document.getElementById("desc");
        const next = document.getElementById("next");
        const ytLink = document.getElementById("link");
        const pic = document.getElementById("pic");
        const mapLink = document.getElementById("map");
        const activityTitle = document.getElementById("title1");

        // Update the content of each element
        desc.textContent = activities[index].description;
        next.textContent = activities[index].name;
        ytLink.innerHTML = activities[index].youtube_link;
        pic.src = activities[index].img_src;
        mapLink.innerHTML = activities[index].mapLink;
        activityTitle.textContent = activities[index].name;
    }
});
