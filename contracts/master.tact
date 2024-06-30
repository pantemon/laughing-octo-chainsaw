import "@stdlib/deploy";

contract Item with Deployable {
    owner: Address;
    master: Address;
    
    init(owner: Address, master: Address) {
      self.owner = owner;
      self.master = master;
    }

    get fun get_my_address(): Address {
        let init: StateInit = initOf Item(self.owner, self.master);
        dump("ITEM");
        dump(self.owner);
        dump(self.master);
        dump(contractAddress(init));
        return contractAddress(init);
    }
}

contract Master with Deployable {
    get fun get_item_address(owner_address: Address): Address {
        let init: StateInit = initOf Item(owner_address, myAddress());
        dump("MASTER");
        dump(owner_address);
        dump(myAddress());
        dump(contractAddress(init));
        return contractAddress(init);
    }
}