let web3;
let contract;
let tokenContract;
let userAccount;

async function connect() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        userAccount = accounts[0];
        document.getElementById("walletAddress").innerText = userAccount;
        contract = new web3.eth.Contract(contractABI, contractAddress);
        tokenContract = new web3.eth.Contract([
            { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "", "type": "bool" } ], "type": "function" }
        ], tokenAddress);
    } else {
        alert("Please install MetaMask!");
    }
}

async function approve() {
    const amount = document.getElementById("amountInput").value;
    const amountWei = web3.utils.toWei(amount, "ether");
    await tokenContract.methods.approve(contractAddress, amountWei).send({ from: userAccount });
    alert("✅ Approved!");
}

async function stake() {
    const amount = document.getElementById("amountInput").value;
    const tier = document.getElementById("tierSelect").value;
    const amountWei = web3.utils.toWei(amount, "ether");
    await contract.methods.stake(amountWei, tier).send({ from: userAccount });
    alert("✅ Staked Successfully!");
}

async function claim() {
    const index = document.getElementById("stakeIndexInput").value;
    await contract.methods.claim(index).send({ from: userAccount });
    alert("✅ Claimed!");
}

async function unstake() {
    const index = document.getElementById("stakeIndexInput").value;
    await contract.methods.unstake(index).send({ from: userAccount });
    alert("✅ Unstaked!");
}
