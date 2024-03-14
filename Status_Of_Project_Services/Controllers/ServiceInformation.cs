namespace Status_Of_Project_Services.Controllers
{
    public class ServiceInformation
    {
        public string ServiceName { get; set; }
        public string SchemaName { get; set; }
        public string ServiceURL { get; set; }
        public string Status { get; set; }
        public int StatusCode { get; set; }
        public long ElapsedTime { get; set; }
    }

}
