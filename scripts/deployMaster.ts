import { toNano } from '@ton/core';
import { Master } from '../wrappers/Master';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const master = provider.open(await Master.fromInit(BigInt(Math.floor(Math.random() * 10000))));

    await master.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(master.address);

    console.log('ID', await master.getId());
}
