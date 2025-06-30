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

const customerCash = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseButton = document.getElementById("purchase-btn");

function roundToTwo(num) {
  return Math.round(num * 100) / 100;
}

purchaseButton.addEventListener("click", () => {
  const customerCashValue = parseFloat(customerCash.value);
  if (price > customerCashValue) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  if (price === customerCashValue) {
    changeDue.textContent = "No change due - customer paid with exact cash";
    return;
  }

  let changeDueAmount = roundToTwo(customerCashValue - price);
  let remainingChange = changeDueAmount;

  const cashInDrawer = roundToTwo(cid.reduce((acc, curr) => acc + curr[1], 0));

  const conversionToDollars = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.10,
    "QUARTER": 0.25,
    "ONE": 1.00,
    "FIVE": 5.00,
    "TEN": 10.00,
    "TWENTY": 20.00,
    "ONE HUNDRED": 100.00
  };

  if (Math.abs(remainingChange - cashInDrawer) < 0.01) {
  
    const reversedCid = cid.slice().reverse();
    let formattedChange = reversedCid
      .filter(([name, amount]) => amount > 0)
      .map(([name, amount]) => `${name}: $${amount.toFixed(2)}`)
      .join(", ");
    changeDue.textContent = `Status: CLOSED ${formattedChange}`;
    return;
  }

  const reversedCid = cid.slice().reverse();
  let changeArray = [];

  for (let [name, amountAvailable] of reversedCid) {
    const currencyValue = conversionToDollars[name];
    let amountToReturn = 0;

    while (remainingChange >= currencyValue && amountAvailable >= currencyValue) {
      remainingChange = roundToTwo(remainingChange - currencyValue);
      amountAvailable = roundToTwo(amountAvailable - currencyValue);
      amountToReturn = roundToTwo(amountToReturn + currencyValue);
    }

    if (amountToReturn > 0) {
      changeArray.push([name, amountToReturn]);
    }
  }

  if (remainingChange > 0) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  let formattedChange = changeArray
    .map(([name, amount]) => `${name}: $${amount.toFixed(2)}`)
    .join(", ");

  changeDue.textContent = `Status: OPEN ${formattedChange}`;
});

customerCash.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    purchaseButton.click();
  }
});
