function wire(a, c, b) {
  account[a] += c;
  account[b] -= c;
  return 0 > account[b] ? 1 : 0;
}
function print_balance(a) {
  print("--------------------------------------------");
  print(" The balance of the bank accounts is:");
  print(" Account 0: " + account[0] + " u$s");
  print(" Account 1: " + account[1] + " u$s (profit)");
  print(" Overall money: " + (account[0] + account[1]));
  print("--------------------------------------------");
  "undefined" !== typeof a && (print(" Estimated daily profit: " + 86400 / a * account[1]), print("--------------------------------------------"));
}
function reset_values() {
  account[0] = initial_deposit;
  account[1] = 0;
}
account = [];
initial_deposit = 1E6;
profit = 0;
print("\n1) Searching for the best profit");
for (i = 1E-18;.1 > i;i += 1E-19) {
  if (reset_values(), wire(1, i, 0), account[0] == initial_deposit && i > profit) {
    profit = i;
  } else {
    break;
  }
}
print("   Found: " + profit.toPrecision(21));
print("\n2) Let's start moving some money:");
reset_values();
start = (new Date).getTime() / 1E3;
for (j = 0;1E10 > j;j++) {
  for (i = 0;1E9 > i;i++) {
    wire(1, profit, 0);
  }
  finish = (new Date).getTime() / 1E3;
  print_balance(finish - start);
}
;
