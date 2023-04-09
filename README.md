# Blockchain-based Voting System

### Run
1. Install dependencies in ```setup.sh```.
2. Run ```ganache-cli -m dongseo``` for the Ethereum Client.
3. Run ```truffle migrate --reset --config truffle-config.ejs```.
4. Change ```dir``` variable in src/js/tools.js to your directory path.
5. Run server ```node src/js/server.js```.

### Registration
1. Open ```localhost:3000``` from your browser.
2. Fill the address with one of the address generated from ```ganache-cli```.
3. Don't use the first address because I used it as address owner of the Voting smart contract.

### Login
1. Open ```localhost:3000/login``` from your browser.
2. Fill the address and password from previous step.
3. You will be redirected to voting page.
