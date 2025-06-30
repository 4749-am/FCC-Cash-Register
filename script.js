let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];
const cashInDrawer = cid.reduce((acc, curr) => acc + curr[1], 0);

const customerCash = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseButton = document.getElementById("purchase-btn");

purchaseButton.addEventListener("click", () => {

  const customerCashValue = parseFloat(customerCash.value);
  const changeDueAmount = customerCashValue - price;
  let remainingChange = changeDueAmount;
  const reversedCid = cid.slice().reverse();
  const conversionToDollars = {
    "PENNY":	0.01,
    "NICKEL":	0.05,
    "DIME":	0.10,
    "QUARTER":	0.25,
    "ONE":	1.00,
    "FIVE":	5.00,
    "TEN":	10.00,
    "TWENTY":	20.00,
    "ONE HUNDRED":	100.00
  }

  if (price > customerCashValue) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  if (price === customerCashValue) {
    changeDue.textContent = "No change due - customer paid with exact cash";
    return;
  }
});
