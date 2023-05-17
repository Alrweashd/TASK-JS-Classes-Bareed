/**************************************************************
 * Point: defines a point on the map using X and Y coordinates
 *
 * x: x coordinate
 * y: y coordinate
 *
 * distanceTo(point): takes a point, calculates the distance to
 *                     that point from the current point.
 *
 * let point = new Point(x, y);
 ****************************************************************/
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distanceTo = (point) => {
    let xDelta = this.x - point.x;
    let yDelta = this.y - point.y;
    return Math.sqrt(xDelta * xDelta + yDelta * yDelta); // PYTHAGORAS!
  };

  equals = (point) => point.x === this.x && point.y === this.y;

  static randomPoint = (maxX, maxY) => {
    let x = Math.random() * (maxX || 100);
    let y = Math.random() * (maxY || 100);
    return new Point(x, y);
  };
}
//let point = new Point(x, y);
let pointB = Point.randomPoint();
console.log(pointB);
console.log(pointB.distanceTo({ x: 3, y: 4 }));
/**********************************************************
 * Wallet: keeps track of money
 *
 * money: how much money is in the wallet. Defaults to 0.
 *
 * credit(amount): adds `amount` to `money`.
 *
 * debit(amount): subtracts `amount` from `money`.
 *
 * let wallet = new Wallet(money);
 **********************************************************/
class Wallet {
  // implement Wallet!
  constructor(money = 0) {
    this.money = money;
  }

  credit = (amount) => {
    if (amount > 0) {
      return (this.money = this.money + amount);
    }
  };

  debit = (amount) => {
    return (this.money = this.money - amount);
  };
}
let wallet1 = new Wallet(120);
wallet1.credit(5);
wallet1.debit(3);
console.log(wallet1.credit(5));
console.log(wallet1.debit(3));
/**********************************************************
 * Person: defines a person with a name (and feelings)
 *
 * name: name of said person
 * location: a Point instance
 * wallet: a Wallet instance initially with 0.
 *
 * moveTo(point): updates the `location` to `point`
 *
 * let person = new Person(name, x, y);
 **********************************************************/
class Person {
  // implement Person!
  name = "Turki";
  location = new Point();
  constructor(name, x, y, wallet = 0) {
    this.name = name;
    this.location = new Point(x, y);
    this.wallet = wallet;
  }
  moveTo(point) {
    this.location = point;
  }
}
let p1 = new Person("Turki", 1, 3);
console.log(p1);
console.log(p1.moveTo(pointB));
console.log(p1);
// let a = [1, 2, 3, 4];
// let b = [...a];
// let c = a;
// b.pop();
// console.log(a);
// c.pop();
// console.log(b);
// console.log(a);
/**********************************************************
 * Vendor: defines a vendor
 * Subclasses Person
 *
 * range: the maximum distance this vendor can travel - initially 5
 * price: the cost of a single ice cream - initially 1
 *
 * sellTo(customer, numberOfIceCreams):  sells a specific number of ice creams
 *     to the customer by doing the following:
 *         - Moves to the customer's location
 *         - Transfers money from the customer's wallet
 *           to the vendor's wallet
 *
 * new vendor = new Vendor(name, x, y);
 **********************************************************/
class Vendor extends Person {
  // implement Vendor!
  constructor(name, location, wallet, range = 5, price = 1) {
    super(name, location, wallet);
    this.range = range;
    this.price = price;
  }

  sellTo(customer, numberOfIceCreams) {
    if (customer.location) this.location = customer.location;
  }
}

/**********************************************************
 * Customer: defines a customer
 * Subclasses Person
 *
 * wallet: a Wallet instance initially with 10.
 *
 * _isInRange(vendor): checks if the customer is in range of vendor.
 *
 * _haveEnoughMoney(vendor, numberOfIceCreams): checks if the customer
 *     has enough money to buy a specific number of ice creams from vendor.
 *
 * requestIceCream(vendor, numberOfIceCreams): if the customer is in the vendor's
 *     range and has enough money for ice cream, a request is sent to the vendor.
 *
 * new customer = new Customer(name, x, y);
 **********************************************************/
class Customer {
  // implement Customer!
}

// export { Point, Wallet, Person, Customer, Vendor };

/***********************************************************
 * If you want examples of how to use the
 * these classes and how to test your code manually,
 * check out the README.md file
 ***********************************************************/
