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
        if(flag == "-rspace"){
            fileData = fileData.split(" ").join("");
        }
        if(flag == "-rnextline"){
            fileData = fileData.split("\r\n").join("");
        }
        
        if(flag == "-rspecialword")
        {  // console.log(secondargument);
            for(let remove of secondargument)
            {
            fileData = fileData.split(remove).join("");
            }
        }
        if(flag=="-seq"){
            let data=addSequence(fileData);
            fileData = data;
           
        }
        if(flag=="-seqwrnl"){
            let data=addSequenceTnel(fileData);
            fileData = data;
           
        }
        if(flag=="-rextraline"){
            let ans=removeExtraLine(fileData);
            fileData = ans;
                        
        }
       if(flag=="-copy"){
        if(file!=filenames[0]){
        let filedata = fs.readFileSync(filenames[0],"utf-8");    //fs.readFileSync(file,"utf-8");
        //fs.writeFileSync(filenames[0],"");
         filedata = filedata +"\r\n"+fileData;
         fs.writeFileSync(filenames[0],filedata);
        }
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





