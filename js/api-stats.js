const apiEndpoints = [
    { method: 'GET', endpoint: '/getQuestion/:id', requests: 0, description: 'Retrieve a specific question' },
    { method: 'POST', endpoint: '/createQuestion', requests: 0, description: 'Create a new question' },
    { method: 'PUT', endpoint: '/updateQuestion', requests: 0, description: 'Update an existing question' },
    { method: 'DELETE', endpoint: '/deleteQuestion/:id', requests: 0, description: 'Delete a question' }
];

async function fetchApiStats() {
    try {
        document.getElementById('loading-spinner').style.display = 'flex';
        document.getElementById('api-stats-body').innerHTML = '';
        
        const response = await fetch('https://isa-project-frontend-yvfn.onrender.com/getApiStats', {
            method: 'GET',
            credentials: 'include'
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch API stats');
        }
        
        const stats = await response.json();
        displayApiStats(stats);
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('api-stats-body').innerHTML = `
            <tr>
                <td colspan="4" class="text-center text-danger">Error loading stats: ${error.message}</td>
            </tr>
        `;
    } finally {
        document.getElementById('loading-spinner').style.display = 'none';
    }
}

function displayApiStats(stats) {
    const tableBody = document.getElementById('api-stats-body');
    
    if (stats.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center">No API statistics available</td>
            </tr>
        `;
        return;
    }
    
    // Sort by requests (descending)
    stats.sort((a, b) => b.requests - a.requests);
    
    tableBody.innerHTML = stats.map(stat => `
        <tr>
            <td>
                <span class="method-${stat.method.toLowerCase()}">
                    <strong>${stat.method}</strong>
                </span>
            </td>
            <td>${stat.endpoint}</td>
            <td class="api-count">${stat.requests}</td>
        </tr>
    `).join('');
}

async function loadUserData() {
    try {
        document.getElementById("api-usage-count").innerText = "Loading...";
        
        const response = await fetch('https://isa-project-frontend-yvfn.onrender.com/getUser', {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        document.getElementById("api-usage-count").innerText = data.user.apiUsage.requestsLeft;
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById("api-usage-count").innerText = "Error";
    }
}

// Call on page load
document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
    fetchApiStats();
});
