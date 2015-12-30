// This is used to wire money
function wire(deposit, money, withdraw) {
  account[deposit] += money;
  account[withdraw] -= money;
  if(account[withdraw]<0)
    return 1; // Error! The account can not have a negative balance
  return 0;
}

// This is used to print the balance
function print_balance(time) {
  print("--------------------------------------------");
  print(" The balance of the bank accounts is:");
  print(" Account 0: "+account[0]+" u$s");
  print(" Account 1: "+account[1]+" u$s (profit)");
  print(" Overall money: "+(account[0]+account[1]))
  print("--------------------------------------------");
  if(typeof time !== 'undefined') {
     print(" Estimated daily profit: "+( (60*60*24/time) * account[1] ) );
     print("--------------------------------------------");
  }
}

// This is used to set the default initial values
function reset_values() {
  account[0] = initial_deposit;
  account[1] = 0; // I will save my profit here 
}

account = new Array();
initial_deposit = 1000000;
profit = 0
print("\n1) Searching for the best profit");
for(i = 0.000000000000000001; i < 0.1; i+=0.0000000000000000001) {
  reset_values();
  wire(1, i, 0); // I will transfer some cents from the account 0 to the account 1
  if(account[0]==initial_deposit && i>profit) {
    profit = i;
 //   print("I can grab "+profit.toPrecision(21));
  } else {
    break;
  }
}
print("   Found: "+profit.toPrecision(21));
print("\n2) Let's start moving some money:");

reset_values();

start = new Date().getTime() / 1000;
for (j = 0; j < 10000000000; j++) {
  for (i = 0; i < 1000000000; i++) { 
    wire(1, profit, 0); // I will transfer some cents from the account 0 to the account 1
  }
  finish = new Date().getTime() / 1000;
  print_balance(finish-start);
}
