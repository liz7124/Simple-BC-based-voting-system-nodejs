import express from 'express'
import tools from './tools.cjs'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RC = tools.constructSmartContract(tools.getContractABI(), tools.getContractAddress());

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/static',express.static('src'));
app.use(cookieParser());

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request,response) {
    response.render('pages/registration');
});

app.post('/registration', async (request, response) => {
    var addr = request.body.address;
    var pwd = request.body.password;
    try {
        let tx = await RC.methods.registerVoter(addr).send({
            from: addr,
            gas: 1000000
        })
        console.log(tx);
        response.send("<p id='accountAddress'>Successfully Registered: "+addr+"</p>");
    } catch(err) {
        console.log(err);
    }
});

app.get('/login',function(request,response) {
    response.render('pages/login', {

    });
});

app.post('/auth', async (request, response) => {
    var addr = request.body.address;
    var pwd = request.body.password;

    try {
        RC.methods.getVoter(addr).call({from: addr}).then(function(res) {
            console.log(res);
            if(res == true) {
                response.cookie('addr', addr);
                response.redirect('/voting');
            } else {
                response.send();
            }
        });
    } catch(err) {
        console.log(err);
    }
});

app.get('/voting', async (request, response)=> {
    let candidateCounter = await RC.methods.candCounter.call().call();
    var _addr = request.cookies.addr
    var _candObj = [];
    for(let i=1; i <= candidateCounter; i++) {
        let _candidates = await RC.methods.candidates(i).call();
        _candObj[i-1] = {id:_candidates['id'],name:_candidates['name'],voteCount:_candidates['voteCount']};
    }
    response.render('pages/voting', {
        candList:_candObj,
        addr: _addr
    });
});

app.post('/vote', async function (request, response) {
    console.log(request.body);
    var candId = request.body.candSelect;
    var addr = request.body.accountAddress;
    try {
        let tx = await RC.methods.vote(candId).send({
            from: addr,
            gas: 1000000
        })
        console.log(tx);
        response.redirect('/voting');
    } catch(err) {
        console.log(err);
    }
});

app.listen(3000, async(request, response) => {
    console.log("I'm listening");
});
