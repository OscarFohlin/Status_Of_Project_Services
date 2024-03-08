// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

document.addEventListener("DOMContentLoaded", function () {
    const services = [
        { name: "TEST API", url: "https://jsonplaceholder.typicode.com/posts", serverurl: "https://jsonplaceholder.typicode.com/posts"},
        { name: "FIXED EVENTS API", url: "https://informatik1.ei.hv.se/FixedEventAPI/api/FixedEvents", serverurl: "https://informatik7.ei.hv.se/ProfilAPI" },
        { name: "FIXED EVENTS API", url: "https://informatik1.ei.hv.se/FixedEventAPI/api/Tags", serverurl: "https://informatik7.ei.hv.se/ProfilAPI" },
        { name: "ORGANIZERS API", url: "https://informatik2.ei.hv.se/OrganizerAPI/api/Organizers", serverurl: "https://informatik2.ei.hv.se/OrganizerAPI" },
        { name: "PROFILE API", url: "https://informatik3.ei.hv.se/KontoInloggAPI/api/Admins", serverurl: "https://informatik7.ei.hv.se/ProfilAPI" },
        { name: "PROFILE API", url: "https://informatik3.ei.hv.se/KontoInloggAPI/api/Orgs", serverurl: "https://informatik7.ei.hv.se/ProfilAPI" },
        { name: "PROFILE API", url: "https://informatik3.ei.hv.se/KontoInloggAPI/api/Users", serverurl: "https://informatik7.ei.hv.se/ProfilAPI" },
        { name: "PROFILE API", url: "https://informatik4.ei.hv.se/EVENTAPI/api/events", serverurl: "https://informatik7.ei.hv.se/ProfilAPI" },
        { name: "PROFILE API", url: "https://informatik7.ei.hv.se/ProfilAPI/api/Profile", serverurl: "https://informatik7.ei.hv.se/ProfilAPI" },
        { name: "ORGANISATIONS API", url: "https://informatik7.ei.hv.se/ProfilAPI/api/Organisation", serverurl: "https://informatik7.ei.hv.se/ProfilAPI" },
        { name: "PROFILE API", url: "https://informatik8.ei.hv.se/Places_API/api/Places", serverurl: "https://informatik7.ei.hv.se/ProfilAPI" },
    ];

    function checkServiceStatus(url, statusElement) {
        fetch(url)
            .then(response => {
                if (response.ok) {
                    statusElement.textContent = "Operational";
                } else {
                    statusElement.textContent = "Down";
                }
            })
            .catch(error => {
                statusElement.textContent = "Down";
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    function checkServerStatus(serverUrl, statusElement) {
        fetch(serverUrl, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    statusElement.textContent = "Server Up";
                } else {
                    statusElement.textContent = "Server Down";
                }
            })
            .catch(error => {
                statusElement.textContent = "Server Down";
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    function checkServiceLatency(url, latencyElement) {
        const startTime = performance.now();
        fetch(url)
            .then(response => {
                const endTime = performance.now();
                const latency = endTime - startTime;
                latencyElement.textContent = `${latency.toFixed(2)} ms`;
            })
            .catch(error => {
                latencyElement.textContent = "N/A";
                console.error('There was a problem with the fetch operation:', error);
            });
    }


    function updateServiceStatus() {
        services.forEach((service, index) => {
            const serviceNameElement = document.getElementById('serviceName' + (index + 1));
            const serviceUrlElement = document.getElementById('serviceUrl' + (index + 1));
            const serviceStatusElement = document.getElementById('serviceStatus' + (index + 1));
            const serverStatusElement = document.getElementById('serverStatus' + (index + 1));
            const latencyElement = document.getElementById('serviceLatency' + (index + 1));

            serviceNameElement.textContent = service.name;
            serviceUrlElement.textContent = service.url;

            checkServiceStatus(service.url, serviceStatusElement);
            checkServerStatus(service.serverurl, serverStatusElement);
            checkServiceLatency(service.url, latencyElement);
        });

    }

    //för att uppdatera sidan varje 5000ms
    setInterval(updateServiceStatus, 5000);
    updateServiceStatus();



});