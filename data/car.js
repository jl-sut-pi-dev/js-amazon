// class Car {
//   #barnd;
//   #model;
//   isTrunkOpen;
//   speed = 0;

//   constructor(barnd, model) {
//     this.#barnd = barnd;
//     this.#model = model;
//   }
//   displayInfo() {
//     console.log(`${this.#barnd} ${this.#model} , ${this.speed} km/h`);
//   }
//   go() {
//     if (this.speed < 200 && this.isTrunkOpen !== true) {
//       this.speed += 5;
//       console.log("driving");
//     }
//     console.log("close trunk");
//   }
//   brake() {
//     if (this.speed > 0) this.speed -= 5;
//   }
//   openTrunk() {
//     if (this.speed === 0) {
//       this.isTrunkOpen = true;
//       console.log("open trunk");
//     }
//   }
//   closeTrunk() {
//     if (this.speed > 0) {
//       return;
//     }
//     this.isTrunkOpen = false;
//     console.log("close trunk ");
//   }
// }

// const toyota1 = new Car("Toyota", "Corolla");
// const tesla = new Car("Tesla", "Model 3");
// toyota1.openTrunk();
// toyota1.closeTrunk();
// toyota1.go();
// toyota1.displayInfo();
// tesla.displayInfo();

// class RaceCar extends Car {
//   acceleration;
//   constructor(barnd, model, acceleration) {
//     super(barnd, model);
//     this.acceleration = acceleration;
//   }
//   go() {
//     if (this.speed < 300) {
//       this.speed += this.acceleration;
//       console.log("driving with " + this.speed + "km/h");
//     }
//   }
//   openTrunk() {
//     console.log("race car do not have a trunk");
//   }
//   closeTrunk() {
//     console.log("race car do not have a trunk");
//   }
// }
// const raceCar = new RaceCar("Mclaren", "f1", 20);
// console.log(raceCar);
// raceCar.go();
// raceCar.go();
