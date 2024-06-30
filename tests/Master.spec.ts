import { Blockchain, SandboxContract, TreasuryContract } from "@ton/sandbox";
import { toNano } from "@ton/core";
import { Master } from "../wrappers/Master";
import { Item } from "../wrappers/Item";
import "@ton/test-utils";

describe("Master", () => {
  let blockchain: Blockchain;
  let deployer: SandboxContract<TreasuryContract>;
  let master: SandboxContract<Master>;

  beforeEach(async () => {
    blockchain = await Blockchain.create();

    master = blockchain.openContract(await Master.fromInit());

    deployer = await blockchain.treasury("deployer");

    const deployResult = await master.send(
      deployer.getSender(),
      {
        value: toNano("0.05"),
      },
      {
        $$type: "Deploy",
        queryId: 0n,
      },
    );

    expect(deployResult.transactions).toHaveTransaction({
      from: deployer.address,
      to: master.address,
      deploy: true,
      success: true,
    });
  });

  it("should deploy", async () => {
    // the check is done inside beforeEach
    // blockchain and master are ready to use
  });

  it("should increase counter", async () => {
    const item = blockchain.openContract(
      await Item.fromInit(deployer.address, master.address),
    );

    const deployResult = await item.send(
      deployer.getSender(),
      {
        value: toNano("0.05"),
      },
      {
        $$type: "Deploy",
        queryId: 0n,
      },
    );

    console.warn(await master.getGetItemAddress(deployer.address));
    console.warn(await item.getGetMyAddress());
  });
});
