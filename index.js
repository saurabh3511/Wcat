#!/usr/bin/env node

const fs = require("fs");
const { isBuffer } = require("util");
let arguments = process.argv.slice(2);

let flags = [];
let filenames = [];
let secondargument = [];

for(let i of arguments){
    if(i[0]=='-') {
        flags.push(i);
    }
    else if(i[0]=='~')
    {   
        secondargument.push(i.slice(1));
    }
    else {
        filenames.push(i);
    }
}


for(let file of filenames)
{
    let fileData = fs.readFileSync(file,"utf-8");
    for(let flag of flags){
        if(flag == "-rs"){
            fileData = fileData.split(" ").join("");
        }
        if(flag == "-rn"){
            fileData = fileData.split("\r\n").join("");
        }
        
        if(flag == "-rsc")
        {  // console.log(secondargument);
            for(let remove of secondargument)
            {
            fileData = fileData.split(remove).join("");
            }
        }
        if(flag=="-s"){
            let data=addSequence(fileData);
            fileData = data;
           
        }
        if(flag=="-sn"){
            let data=addSequenceTnel(fileData);
            fileData = data;
           
        }
        if(flag=="-rel"){
            let ans=removeExtraLine(fileData);
            fileData = ans;
                        
        }
    }
    
    console.log(fileData);
}

function addSequence(content){
    let contentArr=content.split("\r\n");
    let data ="";
    for(let i=0;i<contentArr.length;i++){
        data=data+(i+1)+" "+contentArr[i]+"\r\n";
    }
    return data;
}

function addSequenceTnel(content){
    let contentArr=content.split("\r\n");
    let count=1;
    let data ="";
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=""){
           data=data+count+" "+contentArr[i]+"\r\n";
            count++;
        }
    }
    return data;
}

function removeExtraLine(fileData){
    let contentArr=fileData.split("\r\n");
    let data="";
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]==''){// && contentArr[i-1]==''){
            contentArr[i]=null;
        }
        // if(contentArr[i]=='' && contentArr[i-1]==null){
        //     contentArr[i]=null;
        // } 
    }

    for(let i=0;i<contentArr.length;i++){
        
        if(contentArr[i]!=null){
            data=data +contentArr[i];
            if(i!=contentArr.length-1){
                data=data+"\r\n";
            }
        {   

        }
            
        }
    }
    return data;
}





