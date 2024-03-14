using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Status_Of_Project_Services.Models;
using System.Data;
using System.Diagnostics;
using System.Net.Http.Headers;

namespace Status_Of_Project_Services.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public async Task<IActionResult> Index()
        {
            // Define a list of API URLs to test
            List<string> apiUrls = new List<string>
        {
        "https://informatik1.ei.hv.se/ActivityAPI/api/Activities",
        "https://informatik1.ei.hv.se/ActivityAPI/api/Categories",
        "https://informatik1.ei.hv.se/ActivityAPI/api/Tags",
        "https://informatik2.ei.hv.se/OrganizerAPI/api/Organizers",
        "https://informatik3.ei.hv.se/KontoInloggAPI/api/Users",
        "https://informatik4.ei.hv.se/EVENTAPI2/api/events",
        "https://informatik6.ei.hv.se/statisticapi/api/ActivityStatistics",
        "https://informatik6.ei.hv.se/statisticapi/api/AdStatistics",
        "https://informatik6.ei.hv.se/statisticapi/api/EventStatistics",
        "https://informatik7.ei.hv.se/ProfilAPI/api/Citizens",
        "https://informatik7.ei.hv.se/ProfilAPI/api/SignUps",
        "https://informatik8.ei.hv.se/Places_API/api/Places",
        };

            List<ServiceInformation> serviceInfos = new List<ServiceInformation>();

            foreach (var apiUrl in apiUrls)
            {
                using (var client = new HttpClient())
                {
                    //startar timer för att anropa API:et
                    Stopwatch stopwatch = new Stopwatch();
                    stopwatch.Start();

                    client.BaseAddress = new Uri(apiUrl);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    string schemaName = apiUrl.Split('/').Last() + " SCHEMA";
                    string serviceName = ExtractServiceName(apiUrl);

                    //kolla de olika statusarna av servern och API:en
                    HttpResponseMessage getData = await client.GetAsync("");
                    int statusCode = (int)getData.StatusCode;

                    string statusOfService;

                    //om du får en statuskod som är "godkänd"
                    if (getData.IsSuccessStatusCode)
                    {
                        stopwatch.Stop();
                        statusOfService = "RUNNING";
                    }
                    //eller inte
                    else
                    {
                        statusOfService = "N/A";
                        Console.WriteLine("ERROR");
                    }

                    //för att kunna skriva ut resultaten i listan
                    serviceInfos.Add(new ServiceInformation
                    {
                        ServiceName = serviceName.ToUpper(),
                        SchemaName = schemaName.ToUpper(),
                        ServiceURL = apiUrl,
                        Status = statusOfService,
                        StatusCode = statusCode,
                        ElapsedTime = stopwatch.ElapsedMilliseconds
                    });
                }
            }
            //skiickar tillbaka informationen från listan till view:en som används
            return View(serviceInfos);
        }

        //funktion för att kunna ta ut namnet av servicen som används
        private string ExtractServiceName(string apiUrl)
        {
            Uri uri = new Uri(apiUrl);
            string[] parts = uri.AbsolutePath.Split('/');
            string serviceName = parts.FirstOrDefault(part => !string.IsNullOrEmpty(part));
            return serviceName;
        }

        public IActionResult Service()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
