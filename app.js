// Function to fetch job data from JSON file
async function fetchJobData() {
    try {
        const response = await fetch('jobs-data.json');
        const jobData = await response.json();
        return jobData;
    } catch (error) {
        console.error('Error fetching job data:', error);
        return [];
    }
}

// Function to filter jobs based on keyword and location
function filterJobs() {
    const keyword = document.getElementById("keywordInput").value.toLowerCase();
    const location = document.getElementById("locationInput").value.toLowerCase();

    fetchJobData().then(jobs => {
        const filteredJobs = jobs.filter(job => {
            const title = job.title.toLowerCase();
            const jobLocation = job.location.toLowerCase();
            return title.includes(keyword) && jobLocation.includes(location);
        });

        displayJobs(filteredJobs);
    });
}

// Function to display filtered jobs
function displayJobs(jobs) {
    const jobListContainer = document.getElementById("jobList");
    jobListContainer.innerHTML = "";

    jobs.forEach(job => {
        const jobElement = document.createElement("div");
        jobElement.classList.add("job");
        jobElement.innerHTML = `
        <h2>${job.title}</h2>
        <p><strong>Location:</strong> ${job.location}</p>
        <p><strong>Salary Range:</strong> ${job.salary_range}</p>
        <p>${job.description}</p>
        <a href="${job.apply_url}" target="_blank" class="apply-btn">Apply Now</a>
      `;
        jobListContainer.appendChild(jobElement);
    });
}

// Display all jobs initially
fetchJobData().then(jobs => {
    displayJobs(jobs);
});
