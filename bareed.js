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
//console.log(pointB);
let pointA = Point.randomPoint();
//console.log("hereeee", pointB.distanceTo(pointA));
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
//console.log(wallet1.credit(5));
//console.log(wallet1.debit(3));
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
  //name = "Turki";
  //location = new Point();
  constructor(name, x, y, wallet = 0) {
    this.name = name;
    this.location = new Point(x, y);
    this.wallet = wallet;
  }
  moveTo(point) {
    this.location.x = point.x;
    this.location.y = point.y;
  }
}
let p1 = new Person("Turki", 1, 3);
//console.log("heree 2", p1);
//console.log(p1.moveTo(pointA));
//console.log(p1);
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
  wallet = 0;
  range = 5;
  price = 1;
  // implement Vendor!
  constructor(name, x, y) {
    super(name, x, y);
  }

  sellTo(customer, numberOfIceCreams) {
    //5
    let purchase = numberOfIceCreams * this.price;
    // if (
    //   this.location.distanceTo(customer.location) <= 5 &&
    //   customer.wallet >= purchase)
    {
      //add to vendor's wallet
      this.wallet = this.wallet + purchase;
      //dedicate from customer
      customer.wallet = customer.wallet - purchase;
      //move to customer's point
      this.location = this.moveTo(customer.location);
    }
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
class Customer extends Person {
  // implement Customer!
  wallet = 10;
  constructor(name, x, y) {
    super(name, x, y);
    this.location = new Point(x, y);
    //this.range = range;
    //this.price = price;
  }
  _isInRange(vendor) {
    let point = vendor.location;
    if (this.location.distanceTo(point) <= 5) return true;
    else false;
  }
  _haveEnoughMoney(vendor, numberOfIceCreams) {
    let purchase = numberOfIceCreams * vendor.price;
    if (this.wallet >= purchase) return true;
    else false;
  }
  requestIceCream(vendor, numberOfIceCreams) {
    if (
      this._isInRange(vendor) &&
      this._haveEnoughMoney(vendor, numberOfIceCreams)
    ) {
      vendor.sellTo(this, numberOfIceCreams);
    }
  }
}

// export { Point, Wallet, Person, Customer, Vendor };

/***********************************************************
 * If you want examples of how to use the
 * these classes and how to test your code manually,
 * check out the README.md file
 ***********************************************************/
let vendorAsis = new Vendor("Asis", 10, 10); // create a new vendor named Asis at location (10,10)
let nearbyCustomer = new Customer("MishMish", 11, 11); // create a new customer named MishMish at location (11,11)
let distantCustomer = new Customer("Hamsa", 1000, 1000); // create a new customer named Hamsa at location (1000,1000)
let brokeCustomer = new Customer("Maskeen", 12, 12); // create a new customer named Maskeen at location (12,12)

brokeCustomer.wallet.money = 0; // steal all of Maskeen's money

nearbyCustomer.requestIceCream(vendorAsis, 10); // ask to buy 10 ice creams from Asis
// money was transferred from MishMish to Asis
nearbyCustomer.wallet.money; // 0 left
console.log(nearbyCustomer.wallet);
vendorAsis.wallet.money; // 10
console.log(vendorAsis.wallet);
// Asis moved to MishMish's location
vendorAsis.location; // { x: 11, y: 11 }

distantCustomer.requestIceCream(vendorAsis, 10); // ask to buy 10 ice creams from Asis
// no money was transferred because the request failed - Hamsa is too far away
distantCustomer.wallet.money; // 10 left
vendorAsis.wallet.money; // still only 10
// Asis didn't move
vendorAsis.location; // { x: 11, y: 11 }

console.log(vendorAsis.location);
