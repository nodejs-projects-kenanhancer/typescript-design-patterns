/*

Let's consider a scenario where we have a remote service that provides access to a large database. 
We want to create a proxy object that acts as a substitute for the real service object and 
provides authentication and authorization checks before allowing access to the database.


Finally, we will define the proxy object that provides authentication and authorization checks 
before allowing access to the database:

*/

interface DatabaseService {
  getTableNames(): string[];
  getTableData(tableName: string): string[];
}

class RemoteDatabaseService implements DatabaseService {
  private readonly userName: string;
  private readonly password: string;

  constructor(userName: string, password: string) {
    this.userName = userName;
    this.password = password;
  }

  getTableNames(): string[] {
    console.log('Getting table names from remote database"');

    // simulate a long network operation

    return ["Table1", "Table2", "Table3"];
  }

  getTableData(tableName: string): string[] {
    console.log(`Getting data from table ${tableName} in remote database`);

    // simulate a long network operation

    return ["Data1", "Data2", "Data3"];
  }
}

class DatabaseServiceProxy implements DatabaseService{
  
}