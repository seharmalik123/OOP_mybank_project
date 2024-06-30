#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//Bank Account Class Creation:
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    //Debit money:
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.red(`Withdrawel of $${amount} Successful. Your Remaining Balance is $${this.balance}`));
        }
        else {
            console.log(chalk.blue("Insufficient Balance."));
        }
    }
    //Credit Money:
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; //$ fee Charged if more than $100 is deposited
        }
        this.balance += amount;
        console.log(chalk.red(`Deposit of $ ${amount} Successful. Your Remaining Balance is $ ${this.balance}`));
    }
    //Check Balance:
    checkbalance() {
        console.log(chalk.green(`Your Current Balance $ ${this.balance}`));
    }
}
//Creating Customer class:
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Create Bank Accounts:
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
];
//Creating Customers:
const customers = [
    new Customer("Hamzah", "Khan", "Male", 35, 3162223334, accounts[0]),
    new Customer("malik", "Rashid", "Male", 24, 34562223334, accounts[1]),
    new Customer("Rahemeen", "Ahmed", "Female", 30, 3332223334, accounts[2]),
];
//Function to Interect with Bank Account:
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: chalk.magenta("Enter your Account Number:")
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(chalk.yellow(`\n Wellcome, ${customer.firstName} ${customer.lastName}!\n`));
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "select an operation",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }
            ]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "number",
                            message: chalk.green("Enter the amount to Deposit:")
                        }
                    ]);
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "number",
                            message: chalk.blue("Enter the amount to withdraw:")
                        }
                    ]);
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkbalance();
                    break;
                case "Exit":
                    console.log(chalk.green("Exiting Bank Program..."));
                    console.log(chalk.magenta("\n Thank you for using our Bank services. Have a Nice Day!\n"));
                    return;
            }
        }
        else {
            console.log(chalk.blue("Invalid Account Number. Please try Again"));
        }
    } while (true);
}
service();
