const request = require("supertest");
const http = require("http");
const { app } = require("../index");
const { getAllEmployees, getEmployeeById } = require("../controllers");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
}));

beforeAll(() => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(() => {
  server.close();
});

describe("API Endpoint tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //Exercise 3: Test Retrieve All Employees.
  it("GET /employees should get all employees", async () => {
    getAllEmployees.mockResolvedValue([
      {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: "Priya Singh",
        email: "priya.singh@example.com",
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: "Ankit Verma",
        email: "ankit.verma@example.com",
        departmentId: 1,
        roleId: 3,
      },
    ]);

    let result = await request(server).get("/employees");
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      employees: [
        {
          employeeId: 1,
          name: "Rahul Sharma",
          email: "rahul.sharma@example.com",
          departmentId: 1,
          roleId: 1,
        },
        {
          employeeId: 2,
          name: "Priya Singh",
          email: "priya.singh@example.com",
          departmentId: 2,
          roleId: 2,
        },
        {
          employeeId: 3,
          name: "Ankit Verma",
          email: "ankit.verma@example.com",
          departmentId: 1,
          roleId: 3,
        },
      ],
    });
  });

  //Exercise 4: Test Retrieve Employee by ID.
  it("GET /employees/details/:id should get an employee by ID", async () => {
    getEmployeeById.mockResolvedValue({
      employeeId: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      departmentId: 1,
      roleId: 1,
    });

    let result = await request(server).get("/employees/details/1");
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      employee: {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      },
    });
  });
});

describe("Controller function tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAllEmployees function should return all employees", () => {
    const mockEmployees = [
      {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: "Priya Singh",
        email: "priya.singh@example.com",
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: "Ankit Verma",
        email: "ankit.verma@example.com",
        departmentId: 1,
        roleId: 3,
      },
    ];

    getAllEmployees.mockReturnValue(mockEmployees);

    const result = getAllEmployees();

    expect(result).toEqual(mockEmployees);
    expect(result.length).toBe(3);
    expect(getAllEmployees).toHaveBeenCalled();
  });

  test("getEmployeeById function should return employee by its ID", () => {
    const mockEmployee = {
      employeeId: 2,
      name: "Priya Singh",
      email: "priya.singh@example.com",
      departmentId: 2,
      roleId: 2,
    };

    getEmployeeById.mockReturnValue(mockEmployee);

    const result = getEmployeeById(2);

    expect(result).toEqual(mockEmployee);
    expect(getEmployeeById).toHaveBeenCalledWith(2);
  });
});
