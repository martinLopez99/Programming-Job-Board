// Get references to the form elements
const keywordsInput = document.getElementById('keywords');
const locationInput = document.getElementById('location');
const searchButton = document.getElementById('filter-button');
const jobList = document.getElementById('job-list');
let counter = 1;

// Displays all jobs on the list.
fetch('./Jobs.json')
    .then(response => response.json())
    .then(jobs => {
        const jobList = document.getElementById('job-list');
        jobs.forEach(job => {
            const li = document.createElement('li');
            li.innerHTML = `
            <h3>${job.title}</h3>
            <p> <strong>Company</strong>: ${job.company}</p>
            <p> <strong>Description</strong>: ${job.description}</p>
            <p> <strong>Location</strong>: ${job.location}</p>
            <p> <strong>Salary</strong>: ${job.salary}</p>
            <button type="button" class="btn btn-dark" id = "apply-button-${counter}">Apply</button>
            <button type="button" class="btn btn-info">More Info</button>
        `;
            counter = ++counter;
            jobList.appendChild(li);
        });

/*         const applyButton = document.getElementById('apply-button');
        const id = document.getElementById('id');
        //const job = document.getElementById('')
        applyButton.addEventListener('click', function (event) {
            alert("Your application for the " + job.title + " position at " + job.company + " has been received!");
        }); */
    });



// Add an event listener to the search button
searchButton.addEventListener("click", function (event) {
    event.preventDefault(); // prevent the form from submitting

    // Get the values of the keywords and location inputs
    const keywords = keywordsInput.value.toLowerCase();
    const location = locationInput.value.toLowerCase();



    jobList.innerHTML = '';

    fetch('./Jobs.json')
        .then(response => response.json())
        .then(jobs => {
            const jobList = document.getElementById('job-list');
            jobs.forEach(job => {

                const li = document.createElement('li');
                const boolResult = job.title.toLowerCase().includes(keywords) &&
                    job.location.toLowerCase().includes(location);

                if (boolResult) {
                    li.innerHTML = `
                <h3>${job.title}</h3>
                <p> <strong>Company</strong>: ${job.company}</p>
                <p> <strong>Description</strong>: ${job.description}</p>
                <p> <strong>Location</strong>: ${job.location}</p>
                <p> <strong>Salary</strong>: ${job.salary}</p>
                <button type="button" class="btn btn-dark">Apply</button>
                <button type="button" class="btn btn-info">More Info</button>
            `;
                    jobList.appendChild(li);
                }
            });
        });


});






