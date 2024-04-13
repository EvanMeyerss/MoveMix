// Created: 4/12/2024
// Updated:
const activities = [];
let currentIndex = 0
let iterator = 0
let easyIterator = 0
let medIterator = 0
let hardIterator = 0
let bucketSelect = 0
let easyBool = true
let medBool = true
let hardBool = true
let Num_sports = activities.length

class HashTable {
    constructor() {
        this.buckets = {};
        this.size = Num_sports;
        // Initialize buckets for easy, medium, and hard difficulties
        this.buckets['easy'] = [];
        this.buckets['medium'] = [];
        this.buckets['hard'] = [];
    }


    // Function to generate hash code
    hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % this.size;
    }


    // Function to insert an object into the hash table
    insert(object) {
        const intensity = object.intensity;
        if (!this.buckets[intensity]) {
            this.buckets[intensity] = []; // Initialize the bucket if it doesn't exist
        }
        const index = this.hash(intensity);
        this.buckets[intensity].push(object);
    }


    // Function to retrieve objects of a certain difficulty
    retrieve(intensity) {
        return this.buckets[intensity];
    }
}


const hashTable = new HashTable();
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
                    activities.push(activity);
                }
            }

            // Call the propagate function with the activities array
            for (let i = 0; i < activities.length; i++)
            {
                hashTable.insert(activities[i]);
            }
            // Retrieve objects of different difficulties
            const easyObjects = hashTable.retrieve('easy');
            const mediumObjects = hashTable.retrieve('medium');
            const hardObjects = hashTable.retrieve('hard');
            console.log("Easy Objects:", easyObjects);
            console.log("Medium Objects:", mediumObjects);
            console.log("Hard Objects:", hardObjects);
            currentIndex = Math.floor(Math.random() * easyObjects.length);
            propagate(easyObjects, currentIndex);
            // Set up the event listener for the "Next" button
            document.getElementById("next").addEventListener("click", () => {
                let bucketfound = false;
                while(bucketfound == false) {
                    bucketSelect = Math.floor(Math.random() * 3) + 1;
                    console.log("bucketSelect", bucketSelect)
                    if(bucketSelect == 1 && easyBool) {
                        easyIterator++;


                        currentIndex = Math.floor(Math.random() * easyObjects.length);
                        console.log("currentIndex1", currentIndex);
                        while (easyObjects[currentIndex].selected == true)
                        {
                            currentIndex = Math.floor(Math.random() * easyObjects.length);
                            console.log("currentIndex2", currentIndex)
                        }
                        if(easyIterator >= (easyObjects.length-1)) {
                            easyBool = false;
                        }
                        console.log("easyIterator", easyIterator)
                        propagate(easyObjects, currentIndex);
                        bucketfound = true
                    }
                    else if(bucketSelect == 2 && medBool) {
                        medIterator++;


                        currentIndex = Math.floor(Math.random() * mediumObjects.length);
                        console.log("currentIndex1", currentIndex);
                        while (mediumObjects[currentIndex].selected == true)
                        {
                            currentIndex = Math.floor(Math.random() * mediumObjects.length);
                            console.log("currentIndex2", currentIndex);
                        }
                        if(medIterator >= mediumObjects.length) {
                            medBool = false;
                        }
                        console.log("medIterator", medIterator)
                        propagate(mediumObjects, currentIndex);
                        bucketfound = true
                    }
                    else if(bucketSelect == 3 && hardBool) {
                        hardIterator++;
                        currentIndex = Math.floor(Math.random() * hardObjects.length);
                        console.log("currentIndex1", currentIndex);
                        while (hardObjects[currentIndex].selected == true)
                        {
                            currentIndex = Math.floor(Math.random() * hardObjects.length);
                            console.log("currentIndex2", currentIndex);
                        }


                        if(hardIterator >= hardObjects.length) {
                            hardBool = false;
                        }
                        console.log("hardIterator", hardIterator)
                        propagate(hardObjects, currentIndex);
                        bucketfound = true
                    }
                    iterator++;
                    if(!easyBool && !medBool && !hardBool) {
                        easyIterator = 0
                        medIterator = 0
                        hardIterator = 0
                        easyBool = true
                        medBool = true
                        hardBool = true
                        for (let i = 0; i < activities.length; i++) {
                            activities[i].selected = false
                        }
                        bucketfound = true
                    }
                }


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
        activities[index].selected = true;
    }
});

function setSideContainerImageHeight() {
    const sideContainer = document.querySelectorAll('.side-container');
    const sideContainerWidth = sideContainer[0].offsetWidth; // Assuming all side containers have the same width

    const images = document.querySelectorAll('.side-container img');
    images.forEach(image => {
        const aspectRatio = image.naturalWidth / image.naturalHeight;
        const height = sideContainerWidth / aspectRatio;
        image.style.height = height + 'px';
    });
}

window.addEventListener('resize', function() {
    setSideContainerImageHeight(); // Call the function whenever the window is resized
});

document.addEventListener('DOMContentLoaded', function() {
    setSideContainerImageHeight(); // Call the function after the page loads
});

window.addEventListener('load', function() {
    setSideContainerImageHeight(); // Call the function when the window is refreshed or reloaded
});