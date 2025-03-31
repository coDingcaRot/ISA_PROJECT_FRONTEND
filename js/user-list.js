
let currentPage = 1;
const usersPerPage = 20;
let totalUsers = 0;

async function fetchAllUsers(page = 1) {
    try {
        currentPage = page;
        document.getElementById('loading-spinner').style.display = 'flex';
        document.getElementById('users-table-body').innerHTML = '';
        
        const response = await fetch(`https://isa-project-frontend-yvfn.onrender.com/getAllUsers?page=${page}&limit=${usersPerPage}`, {
            method: 'GET',
            credentials: 'include'
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        
        const data = await response.json();
        totalUsers = data.totalCount;
        displayUsers(data.users);
        setupPagination(totalUsers);
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('users-table-body').innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-danger">Error loading users: ${error.message}</td>
            </tr>
        `;
    } finally {
        document.getElementById('loading-spinner').style.display = 'none';
    }
}

function displayUsers(users) {
    const tableBody = document.getElementById('users-table-body');
    
    if (users.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center">No users found</td>
            </tr>
        `;
        return;
    }
    
    tableBody.innerHTML = users.map(user => `
        <tr>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>
                <span class="badge rounded-pill ${user.admin ? 'badge-admin' : 'badge-user'}">
                    ${user.admin ? 'Admin' : 'User'}
                </span>
            </td>
            <td class="api-count">${user.requestsLeft}</td>
            <td class="api-count">${user.totalRequests}</td>
            <td class="api-count">${user.lastReset}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-outline-dark" onclick="resetUserApi('${user.email}')">
                        <i class="bi bi-arrow-clockwise"></i> Reset
                    </button>
                    <button class="btn btn-sm btn-danger-custom" onclick="deleteUser('${user._id}', '${user.email}')">
                        <i class="bi bi-trash"></i> Delete
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function setupPagination(totalUsers) {
    const totalPages = Math.ceil(totalUsers / usersPerPage);
    const pagination = document.getElementById('pagination');
    
    pagination.innerHTML = '';
    
    // Previous button
    pagination.innerHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="fetchAllUsers(${currentPage - 1})" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
    `;
    
    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        pagination.innerHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="fetchAllUsers(${i})">${i}</a>
            </li>
        `;
    }
    
    // Next button
    pagination.innerHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="fetchAllUsers(${currentPage + 1})" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    `;
}

async function resetUserApi(email) {
    if (!confirm(`Reset API requests for ${email} to 20?`)) return;
    
    try {
        const response = await fetch('https://isa-project-frontend-yvfn.onrender.com/resetApiRequests', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        
        if (!response.ok) {
            throw new Error(await response.text());
        }
        
        const result = await response.json();
        alert(`Success: ${result.message}\nNew count: ${result.requestsLeft}`);
        fetchAllUsers(currentPage); // Refresh current page
        
    } catch (error) {
        console.error('Reset error:', error);
        alert(`Error: ${error.message || 'Failed to reset API requests'}`);
    }
}

async function deleteUser(userId, email) {
    if (!confirm(`Are you sure you want to permanently delete user ${email}?`)) return;
    
    try {
        const response = await fetch(`https://isa-project-frontend-yvfn.onrender.com/deleteUser/${userId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(await response.text());
        }
        
        const result = await response.json();
        alert(`Success: ${result.message}`);
        fetchAllUsers(currentPage); // Refresh current page
        
    } catch (error) {
        console.error('Delete error:', error);
        alert(`Error: ${error.message || 'Failed to delete user'}`);
    }
}

async function loadUserData() {
    try {
        document.getElementById("api-usage-count").innerText = "Loading...";
        
        const response = await fetch('https://isa-project-frontend-yvfn.onrender.com/getUser', {
            method: 'GET',
            credentials: 'include' // Sends cookies automatically
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        
        // Simply use the count from the response body
        document.getElementById("api-usage-count").innerText = data.user.apiUsage.requestsLeft;
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById("api-usage-count").innerText = "Error";
    }
}


// Call on page load
document.addEventListener('DOMContentLoaded', loadUserData);

// Load users when page opens
document.addEventListener('DOMContentLoaded', () => fetchAllUsers(1));
