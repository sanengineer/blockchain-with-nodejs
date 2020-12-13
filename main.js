const crypto = require("crypto");

class Block {
  constructor(index, data, prevHash) {
    this.index = index;
    this.timestamp = Math.floor(Date.now() / 1000);
    this.data = data;
    this.prevHash = prevHash;
    this.hash = this.getHash();
  }

  getHash() {
    var encript =
      JSON.stringify(this.data) + this.prevHash + this.index + this.timestamp;
    var hash = crypto
      .createHmac("sha256", "secret")
      .update(encript)
      .digest("hex");

    return hash;
  }
}

class BlockChain {
  constructor() {
    this.chain = [];
  }

  addBlock(data) {
    let index = this.chain.length;
    let prevHash =
      this.chain.length !== 0 ? this.chain[this.chain.length - 1].hash : 0;
    let block = new Block(index, data, prevHash);
    this.chain.push(block);
  }

  chainIsValid() {
    for (var i = 0; i < this.chain.length; i++) {
      if (this.chain[i].hash !== this.chain[i].getHash()) return false;
      if (i > 0 && this.chain[i].prevHash !== this.chain[i - 1].hash)
        return false;
    }
    return true;
  }
}

const blockChain = new BlockChain();
blockChain.addBlock({
  sender: " San Engineer",
  receiver: "Frodo",
  ammount: 100000,
});
blockChain.addBlock({
  sender: "San Developer",
  receiver: "Bagins",
  ammount: 40000,
});

blockChain.addBlock({
  sender: "San Mac",
  receiver: "Rings",
  ammount: 8,
});

// check receiver true or false
blockChain.chain[0].data.receiver = "Frodo";

// display console on terminal
console.log(
  "\n\n----------------------------------------------------------------------------------"
);
console.dir(blockChain, { depth: null });
console.log(
  "-----------------------------------------------------------------------------------"
);
console.log("Validity of this blockchain:", blockChain.chainIsValid());
console.log(
  "-----------------------------------------------------------------------------------\n\n"
);
