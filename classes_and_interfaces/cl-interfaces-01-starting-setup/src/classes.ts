// Code goes here!
abstract class Department {
  static fiscalyear = 2020;
  //   private id: string;
  //   private name: string;
  // private employees: string[] = []; //private only used in this class
  protected employees: string[] = []; //avail in this class and extending classes

  constructor(protected readonly id: string, public name: string) {
    // this.id = id;
    // this.n = n;
  }

  //specify argument and return type (NO implementation)
  abstract describe(this: Department): void;

  static createEmployee(name: string) {
    return {
      name: name,
    };
  }

  // describe(this: Department) {
  //   console.log(`Department ${this.name}`);
  // }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
    console.log(this.id);
  }
}

class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, "IT"); //calls the parent constructor
    this.admins = admins;
  }

  describe() {
    console.log("IT DEP ID " + this.id);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  protected static employees: string[];
  private static instance: AccountingDepartment;

  //getter
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("no report found");
  }

  describe() {
    console.log("Acc DEP ID " + this.id);
  }
  //setter
  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("please set in a value");
    }
    this.addReport(value);
  }

  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting"); //calls the parent constructor
    this.reports = reports;
    this.employees = [];
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new AccountingDepartment("d2", []);
    return this.instance;
  }

  static addEmployee(name: string): void {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }

  addReport(report: string) {
    this.reports.push(report);
    this.lastReport = report;
  }

  getReports() {
    console.log(this.reports);
  }
}

// const accounting = new AccountingDepartment("123", []);
const accounting = AccountingDepartment.getInstance();
const itDep = new ITDepartment("123", ["Max"]);

const employee = Department.createEmployee("MAx");
console.log(employee, Department.fiscalyear);
// const accountCopy = { name: "s", describe: accounting.describe };
console.log(accounting);
accounting.describe();
accounting.addReport("test");
console.log(accounting.mostRecentReport);
accounting.mostRecentReport = "somethingHere";
// accounting.employees[2] = "Anna"; this throws error if employees property is private
accounting.printEmployeeInformation();
accounting.addEmployee("Max");
accounting.addEmployee("Manu");
console.log("test");
accounting.printEmployeeInformation();

accounting.describe();
// console.log(itDep);
// accountCopy.describe();
