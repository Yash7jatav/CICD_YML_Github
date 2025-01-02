const homePage = {
  message: "Welcome to the Employee Management API!",
  description:
    "This API allows you to manage employee records. You can retrieve all employees, or look up individual employee details by ID.",
  available_endpoints: {
    "GET /employees": "Retrieve a list of all employees.",
    "GET /employees/details/:employeeId":
      "Retrieve the details of an individual employee by their unique ID.",
  },
  authentication:
    "No authentication required for public access to employee data.",
  error_handling:
    "If no employees are found, a 404 error will be returned. If there is a server error, a 500 error will be returned.",
  contact: {
    email: "support@company.com",
    phone: "+1-800-555-1234",
  },
  documentation_url: "https://api.company.com/docs",
};

module.exports = homePage;
