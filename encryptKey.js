const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  console.log(process.env.PRIVATE_KEY_PASSWORD);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  const encryptJsonKey = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASSWORD,
    process.env.PRIVATE_KEY
  );
  console.log(encryptJsonKey);
  fs.writeFileSync("./.encryptedKey.json", encryptJsonKey);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
