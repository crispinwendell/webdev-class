document.getElementById('dataForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Make sure page isn't reloaded

    // Get input values
    const name = document.getElementById('name').value.trim();
    const visits = document.getElementById('visits').value.trim();

    // Create new row and cells
    const tableBody = document.querySelector('#dataTable tbody');
    const newRow = document.createElement('tr');

    [name, visits].forEach(function (text) {
        const cell = document.createElement('td');
        cell.textContent = text;
        newRow.appendChild(cell);
    });

    // Add row to table
    tableBody.appendChild(newRow);

    // Clear form fields
    document.getElementById('dataForm').reset();
});