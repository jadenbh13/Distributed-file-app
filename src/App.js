import {Table, Grid, Button, Form } from 'react-bootstrap';
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import ipfs from './ipfs';
class App extends Component {

    state = {
      ipfsHash:null,
      buffer:'',
      ethAddress:'',
      blockNumber:'',
      transactionHash:'',
      gasUsed:'',
      txReceipt: ''
    };


    captureFile =(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)
      };

    convertToBuffer = async(reader) => {
      //file is converted to a buffer to prepare for uploading to IPFS
        const buffer = await Buffer.from(reader.result);
      //set this buffer -using es6 syntax
        this.setState({buffer});
    }; //onClick


    onS = async(event) => {
          var el = document.getElementById('inpFile').value;
          console.log(el);
          ipfs.cat(el, function(err, buffer) {
           if (err) throw err;
            console.log(buffer);
            document.getElementById('contents').value = buffer.toString();
            document.getElementById("getButton").click();
          });       
          console.log("Initialized");
    };
    returned = async(event) => {



          function saveByteArray(reportName, byte) {
              var blob = new Blob([byte], {type: "application/pdf"});
              var link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              var fileName = reportName;
              link.download = fileName;
              link.click();
          };



          var hashLists = document.getElementById("hashList").innerText;
          var hashList = hashLists.split(",");
          console.log(hashList);
          var nameLists = document.getElementById("nameList").innerText;
          var nameList = nameLists.split(",");
          console.log(nameList);
          var l;
          var w = document.getElementsByClassName("trx_addons_column-1_4");
          var down = document.getElementsByClassName("icon-plus-1");
          var texter = document.getElementsByClassName("sc_team_item_subtitle");
          for (l = 0; l < hashList.length; l++) {
            var buff = hashList[l];
            down[l].addEventListener("click", function(){
              console.log(this.alt);
              var stry = this.alt.toString();
              var t = 0;
              for (t = 0; t < nameList.length; t++) {
                if(nameList[t] == this.alt) {
                  console.log(hashList[t]);
                  ipfs.cat(hashList[t], function(err, buffer) {
                    if (err) throw err;
                    console.log(buffer);
                    saveByteArray(stry, buffer);
                  });
                }
              }
              

            });
          }
    };
    onSubmit = async (event) => {
      event.preventDefault();

      //bring in user's metamask account address
      const accounts = await web3.eth.getAccounts();

      console.log('Sending from Metamask account: ' + accounts[0]);


      //obtain contract address from storehash.js

      //save document to IPFS,return its hash#, and set hash# to state
      //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add
      await ipfs.add(this.state.buffer, (err, ipfsHash) => {
        function GetFilename(url)
        {
           if (url)
           {
              var m = url.toString().match(/.*\/(.+?)\./);
              if (m && m.length > 1)
              {
                 return m[1];
              }
           }
           return "";
        }
        document.getElementById("fireButton").click();
        document.getElementById("addsButton").click();
        var fullPath = document.getElementById("filer").value;
        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
        var filename = fullPath.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }
        document.getElementById("filename").innerText = filename;
        console.log(err,ipfsHash);
        //setState by setting ipfsHash to ipfsHash[0].hash
        this.setState({ ipfsHash:ipfsHash[0].hash });
        console.log({ ipfsHash:ipfsHash[0].hash });
        console.log(document.getElementById('hashValue').innerHTML);

        // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract
        //return the transaction hash from the ethereum contract
        //see, this https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send
        //storehash
      })
    }; //onSubmit

    render() {

      return (
        <center>
        <div className="App" id="applis">

          <hr />

        <Grid >
          <h3> Choose file to send to the blockchain </h3>

          <Form onSubmit={this.onSubmit}>
              <input
                type = "file"
                id="filer"
                onChange = {this.captureFile}
              />
            <br></br>
            <br></br>
             <Button
             bsStyle="primary"
             type="submit" id="butn">
             Send it
             </Button>
          </Form>
          <hr/>
              <Table bordered responsive>
                <thead>
                </thead>

                <tbody >
                  <tr>
                    <td>IPFS Hash #</td>
                    <td id="hashValue">{this.state.ipfsHash}</td>
                  </tr>
                </tbody>
            </Table>
            <a id="clicker" onClick={this.returned}></a>
        </Grid>

     </div>
     </center>
      );
    } //render


}

export default App;
