
function Trend() {

    function TicketsCountByDate() {
      return fetch('/api/getTicketsCountByDate')
        .then(response => response.json())
        .then(data => {
          // Your chart creation logic
            // Extract data for chart
      const dates = data.tickets.map(ticket => ticket.date);
      const ticketCounts = data.tickets.map(ticket => ticket.ticketsCount);

      // Create a Chart.js chart
      const ctx = document.getElementById('ticketsByDateChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar', // You can choose different chart types (bar, line, pie, etc.)
        data: {
          labels: dates,
          datasets: [{
            label: 'Ticket Counts',
            data: ticketCounts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Customize colors as needed
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    })
        
        .catch(error => console.error('Error fetching data:', error));
    }
  
    function TicketsCountBySubIssue() {
      return fetch('/api/getTicketsCountBySubIssue')
        .then(response => response.json())
        .then(data => {
          // Your chart creation logic
          const subIssues = data.tickets.map(ticket => ticket.subIssue);
      const ticketCounts = data.tickets.map(ticket => ticket.ticketsCount);

      const ctx = document.getElementById('ticketsBySubIssueChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: subIssues,
          datasets: [{
            label: 'Ticket Counts',
            data: ticketCounts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    })
        
        .catch(error => console.error('Error fetching data:', error));
    }
  
    function GenerateReports() {
      return fetch('/api/generateReports')
        .then(response => response.json())
        .then(data => {
          // Your chart creation logic
           // Extract data for chart
        // Customize the data extraction based on your actual response structure
        const reportTypes = data.reports.map(report => report.type);
        const reportCounts = data.reports.map(report => report.count);
  
        // Create a Chart.js chart
        const ctx = document.getElementById('reportsChart').getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: reportTypes,
            datasets: [{
              label: 'Report Counts',
              data: reportCounts,
              backgroundColor: 'rgba(255, 99, 132, 0.2)', // Customize colors as needed
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            }],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      })

        
        .catch(error => console.error('Error fetching data:', error));
    }
  
    function SpecificTicketsCountByDate() {
      return fetch('/api/getSpecificTicketsCountByDate')
        .then(response => response.json())
        .then(data => {
          // Your chart creation logic
          const specificDates = data.tickets.map(ticket => ticket.date);
        const specificTicketCounts = data.tickets.map(ticket => ticket.ticketsCount);
  
        const ctx = document.getElementById('specificTicketsByDateChart').getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: specificDates,
            datasets: [{
              label: 'Specific Ticket Counts',
              data: specificTicketCounts,
              backgroundColor: 'rgba(255, 205, 86, 0.2)',
              borderColor: 'rgba(255, 205, 86, 1)',
              borderWidth: 1,
            }],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      })
        
        .catch(error => console.error('Error fetching data:', error));
    }
  
    // Call the functions in sequence
    TicketsCountByDate()
      .then(TicketsCountBySubIssue)
      .then(GenerateReports)
      .then(SpecificTicketsCountByDate)
      .catch(error => console.error('Error in chart generation:', error));
  }
  
  export default Trend;
  
  // Call the Trend function to generate charts
  Trend();
  