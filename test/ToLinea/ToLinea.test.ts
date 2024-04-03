/* eslint-disable */

import {
  impersonateAccount,
  setBalance,
} from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { ToLineaBridge, ToLineaBridge__factory } from "../../typechain-types";
import { Signer } from "ethers";

const IMPERSONATE_ADDRESS = "0xf4f2b2f9da0546A57DBD01f96Dc7e9956DbA6aFb";

// Run test with Mainnet network at hardhat
describe("ToLineaBridge test", function () {
  let impersonatedSigner: Signer;
  let toLineaBridge: ToLineaBridge;

  beforeEach(async () => {
    await impersonateAccount(IMPERSONATE_ADDRESS);
    setBalance(IMPERSONATE_ADDRESS, 1000 * 10 ** 18);
    impersonatedSigner = await ethers.getSigner(IMPERSONATE_ADDRESS);

    toLineaBridge = await new ToLineaBridge__factory(
      impersonatedSigner
    ).deploy();
    //l2 recepient as address(0)
    await toLineaBridge.initialize();
  });

  it("Allows send crosschain tx via across", async function () {
    const depositAmount = "1";

    await impersonatedSigner.sendTransaction({
      to: toLineaBridge.address,
      value: ethers.utils.parseEther(depositAmount),
    });
  });
});
