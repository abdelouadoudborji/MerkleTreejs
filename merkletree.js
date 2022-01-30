const {MerkleTree} =require('merkletreejs');
const keccak256 =require('keccak256');
const express= require('express');
const { append } = require('express/lib/response');
const app =express();
var cors = require('cors')

let whitelistaddresses=[
    "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
    "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
    "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
    "0x617F2E2fD72FD9D5503197092aC168c91465E7f2",
    "0x17F6AD8Ef982297579C203069C1DbfFE4348c372",
    "0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678",
    "0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7",
    "0xc0829f7187932d545c77FebfBB4FD2e5D787109B"

]

const leafNodes=whitelistaddresses.map(addr=> keccak256(addr));
const merkleTree= new MerkleTree(leafNodes,keccak256,{sortPairs: true});
app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.get('/getproof/:addr',(req,res)=>{
    const claimingaddress=keccak256(req.params.addr).toString('hex');
    res.send(merkleTree.getHexProof(claimingaddress));
});
app.get('/',(req,res)=>{
   
   res.send(merkleTree.getHexRoot());
});
const port= process.env.PORT || 3000;
app.listen(port, ()=> console.log('running ...'))
