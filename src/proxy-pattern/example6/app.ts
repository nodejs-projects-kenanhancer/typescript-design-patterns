/*

Suppose you have a BankAccount class that represents a bank account, 
and you want to limit the access to the withdraw() method of this class 
based on the account balance. If the account balance is less than the withdrawal amount, 
you want to prevent the withdrawal and log an error message.

In this scenario, you can use a Proxy to implement the access control logic in a separate class, 
without modifying the BankAccount class

*/

interface BankAccount {
  deposit(amount: number): void;
  withDraw(amount: number): void;
  getBalance(): number;
}

class RealBankAccount implements BankAccount {
  private balance: number;

  constructor(balance: number) {
    this.balance = balance;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  withDraw(amount: number): void {
    this.balance -= amount;
  }

  getBalance(): number {
    return this.balance;
  }
}

class BankAccountProxy implements BankAccount {
  private readonly realBankAccount: BankAccount;

  constructor(balance: number) {
    this.realBankAccount = new RealBankAccount(balance);
  }

  deposit(amount: number): void {
    this.realBankAccount.deposit(amount);
  }

  withDraw(amount: number): void {
    if (this.realBankAccount.getBalance() >= amount) {
      this.realBankAccount.withDraw(amount);
    } else {
      console.log(`Insufficient balance to withdraw ${amount}`);
    }
  }

  getBalance(): number {
    return this.realBankAccount.getBalance();
  }
}

(function () {
  const bankAccount: BankAccount = new BankAccountProxy(100);

  bankAccount.deposit(50);
  bankAccount.withDraw(75); // This should succeed
  bankAccount.withDraw(100); // This should fail and log an error message

  const balance = bankAccount.getBalance();

  console.log(`Account balance: ${balance}`);
})();
