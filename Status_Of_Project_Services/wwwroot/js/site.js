// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

document.addEventListener("DOMContentLoaded", function () {
    const services = [
        { name: "ADVERTISEMENT API", url: "https://jsonplaceholder.typicode.com/posts" },
        { name: "ORGANISATIONS API", url: "https://informatik7.ei.hv.se/ProfilAPI/api/Organisation" },
        { name: "PROFILE API", url: "https://informatik7.ei.hv.se/ProfilAPI/api/Profile" },
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

    function checkServerStatus(url, statusElement, latencyElement) {
        fetch(url, { method: 'HEAD' })
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



    services.forEach((service, index) => {
        const serviceStatusElement = document.getElementById('serviceStatus' + (index + 1));
        const serverStatusElement = document.getElementById('serverStatus' + (index + 1));
        const latencyElement = document.getElementById('serviceLatency' + (index + 1));
        checkServiceStatus(service.url, serviceStatusElement);
        checkServerStatus(service.url, serverStatusElement);
        checkServiceLatency(service.url, latencyElement);
    });
});