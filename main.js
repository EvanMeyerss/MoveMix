// Created: 4/12/2024
// Updated:
const activities = [];
let currentIndex = 0
let iterator = 0

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
                        map_link: data[key].map_link,
                        youtube_link: data[key].youtube_link,
                        intensity: data[key].intensity,
                        selected: data[key].selected
                    };

                    // Add the activity object to the activities array
                    currentIndex = Math.floor(Math.random() * 56) + 1;
                    activities.push(activity);
                }
            }

            console.log(activities);

            // Call the propagate function with the activities array
            propagate(activities, currentIndex);

            // Set up the event listener for the "Next" button
            document.getElementById("next").addEventListener("click", () => {
                iterator++;
                if(iterator >= 57) {
                    iterator = 0
                    for (let i = 0; i < activities.length; i++) {
                        activities[i].selected = false
                    }
                }
                currentIndex = Math.floor(Math.random() * 56) + 1;
                while(activities[currentIndex].selected === true)
                    currentIndex = Math.floor(Math.random() * 56) + 1;
                activities[currentIndex].selected = true
                propagate(activities, currentIndex);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

    function propagate(activities, index) {

        const desc = document.getElementById("desc");
        const next = document.getElementById("next");
        const ytLink = document.getElementById("link");
        const pic = document.getElementById("pic");
        const map_link = document.getElementById("map");
        const activityTitle = document.getElementById("title1");

        // Update the content of each element
        desc.textContent = activities[index].description;
        activityTitle.textContent = activities[index].name;
        ytLink.src = activities[index].youtube_link;
        pic.src = activities[index].img_src;
        map_link.src = activities[index].map_link;
        activityTitle.textContent = activities[index].name;
    }
});
