// Created: 4/12/2024
// Updated:
//array of objects from json file of all the different sports
const activities = [];
//variable for testing to let us know what the current index was(aka what sport was being selected in each bucket)
let currentIndex = 0
//variable for testing to let us know what bucket was selected after each time clicking next
let bucketSelect = 0
//iterator for later use of resetting the sports once all have been looped through
let easyIterator = 0
let medIterator = 0
let hardIterator = 0
//boolean for making sure the buckets from the hash table aren't selected after they have been all used (once all have been fully used they will be reset back to true)
let easyBool = true
let medBool = true
let hardBool = true
//num_sports is equal to the length of the activities array
let Num_sports = activities.length

//hash table class
class HashTable {
    constructor() {
        //making buckets of objects
        this.buckets = {};
        //setting size of hash table to the Num_sports
        this.size = Num_sports;
        // Initialize bucket arrays for easy, medium, and hard difficulties
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

//intalizing hash table
const hashTable = new HashTable();
//event listener for document being loaded
document.addEventListener('DOMContentLoaded', function() {
    //retrieves info.json file to store serialized data in hash table
    fetch('info.json')
        .then(response => response.json())
        .then(data => {
            // Iterate through the object properties
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    // Create a new object for each activity
                    const activity = {
                        // takes in each attribute for each object and assigns to object attributes
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

            // Loop through activities array and insert each activity into a bucket of the hash table
            for (let i = 0; i < activities.length; i++)
            {
                hashTable.insert(activities[i]);
            }
            // Retrieve objects of different difficulties
            const easyObjects = hashTable.retrieve('easy');
            const mediumObjects = hashTable.retrieve('medium');
            const hardObjects = hashTable.retrieve('hard');
            // Used for testing to see if hash table was working properly
            console.log("Easy Objects:", easyObjects);
            console.log("Medium Objects:", mediumObjects);
            console.log("Hard Objects:", hardObjects);
            // Used to get a random element from the easyobjects bucket for the sport that pops up when you load the page
            currentIndex = Math.floor(Math.random() * easyObjects.length);
            propagate(easyObjects, currentIndex);
            // Create array of random numbers from 0-length of the bucket that will be used for indexing through the bucket quickly
            let easy = Array.from({ length: easyObjects.length }, (_, index) => index);
            let med = Array.from({ length: mediumObjects.length }, (_, index) => index);
            let hard = Array.from({ length: hardObjects.length }, (_, index) => index);
            //shuffle each buckets indexing arrays
            shuffleArray(easy);
            shuffleArray(med);
            shuffleArray(hard);
            //see which sports will be printed in what order
            console.log(easy);
            console.log(med);
            console.log(hard);
            //event listener for when user clicks next
            document.getElementById("next").addEventListener("click", () => {
                //bucketfound will let the while loop search until it finds a bucket that has elements
                let bucketfound = false;
                while(bucketfound == false) {
                    bucketSelect = Math.floor(Math.random() * 3) + 1;
                    console.log("bucketSelect", bucketSelect)
                    if(bucketSelect == 1 && easyBool) {
                        currentIndex = easy[easyIterator];
                        easyIterator++;

                        console.log("currentIndex1", currentIndex);

                        if(easyIterator >= (easyObjects.length-1)) {
                            easyBool = false;
                        }
                        console.log("easyIterator", easyIterator)
                        propagate(easyObjects, currentIndex);
                        bucketfound = true
                    }
                    else if(bucketSelect == 2 && medBool) {

                        currentIndex = med[medIterator];
                        medIterator++;
                        console.log("currentIndex1", currentIndex);

                        if(medIterator >= mediumObjects.length) {
                            medBool = false;
                        }
                        console.log("medIterator", medIterator)
                        propagate(mediumObjects, currentIndex);
                        bucketfound = true
                    }
                    else if(bucketSelect == 3 && hardBool) {
                        currentIndex = hard[hardIterator];
                        hardIterator++;
                        console.log("currentIndex1", currentIndex);

                        if(hardIterator >= hardObjects.length) {
                            hardBool = false;
                        }
                        console.log("hardIterator", hardIterator)
                        propagate(hardObjects, currentIndex);
                        bucketfound = true
                    }

                    if(!easyBool && !medBool && !hardBool) {
                        easyIterator = 0;
                        medIterator = 0;
                        hardIterator = 0;
                        easyBool = true;
                        medBool = true;
                        hardBool = true;
                        shuffleArray(easy);
                        shuffleArray(med);
                        shuffleArray(hard);
                        console.log(easy);
                        console.log(med);
                        console.log(hard);
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

        // retrieves address for each html attribute that we want to edit from json data
        const desc = document.getElementById("desc");
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

    //function to shuffle array using fisher-yates algorithim
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
});

// sets the maximum height for all images displayed on the screen
function setSideContainerImageHeight() {
    const sideContainer = document.querySelectorAll('.side-container');
    const sideContainerWidth = sideContainer[0].offsetWidth; // Assuming all side containers have the same width

    const images = document.querySelectorAll('.side-container img');
    images.forEach(image => {
        const aspectRatio = image.naturalWidth / image.naturalHeight;
        const height = sideContainerWidth / aspectRatio;
        image.style.height = 575 + 'px';
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