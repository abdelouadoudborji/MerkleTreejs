const {MerkleTree} =require('merkletreejs');
const keccak256 =require('keccak256');
const express= require('express');
const { append } = require('express/lib/response');
const app =express();

let whitelistaddresses=[
    "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
    "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
    "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
    "0x617F2E2fD72FD9D5503197092aC168c91465E7f2",
    "0x17F6AD8Ef982297579C203069C1DbfFE4348c372",
    "0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678",
    "0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7"

]

const leafNodes=whitelistaddresses.map(addr=> keccak256(addr));
const merkleTree= new MerkleTree(leafNodes,keccak256,{sortPairs: true});
const rootHash=merkleTree.getRoot();
console.log(merkleTree.toString());
console.log(rootHash.toString('hex'));
//hexproof
console.log('claiming address');
console.log(leafNodes[2].toString('hex'));
const hexproof=merkleTree.getHexProof(leafNodes[2]);

console.log(hexproof.toString());

app.get('/',(req,res)=>{
    res.send(hexproof.toString());
})

app.listen(3000, ()=>console.log('test'));