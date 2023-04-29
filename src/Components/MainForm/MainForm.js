import React from 'react';
import "./MainForm.css"
import { tokens } from '../../data';

/*
*This is MainForm component
* this renders whole rendered form 
*/
function MainForm() {
    const [currentValue,setCurrentValue] = React.useState("fetching...");
    const [selectedItem,setSelectedItem] = React.useState(tokens[0]);
    const[calculatednumber,setCalculatedNumber] = React.useState(0);
    const[wantedToInvestAmount,setWantedToInvestAmount] = React.useState(0.00);
    

    /*
    * @param event - this will be the onchangeEvent which will give currently typed value
    * returns no. of units you can purchase through investing amount
    */
    const calculateUnit = (event) =>{
        const newvalue = parseFloat(event.target.value/currentValue).toFixed(2);
        setWantedToInvestAmount(event.target.value);
        setCalculatedNumber(newvalue);
    }
    
    /*
    *This UseEffect will continuously gets called when currentValue chnags and updates units can be buy
    */
    React.useEffect(()=>{
      const newvalue = parseFloat(wantedToInvestAmount /currentValue).toFixed(2);
      setCalculatedNumber(newvalue);
    },[currentValue,wantedToInvestAmount]);

    /*
    * This UsEEffect will update the websocket fetching keys of tokens 
    * while cleaning  or closing previous connection
    * to usdt to rupee conversion , I have used  80 rupees as a constant
    */
    React.useEffect(()=>{
    var ws = new WebSocket(`wss://stream.binance.com:9443/ws/${selectedItem.key}@trade`);
    ws.onmessage = (event)=>{
        const data = JSON.parse(event.data);
        setCurrentValue(parseFloat(data.p * 80).toFixed(2));

    };
    return ()=>{
        ws.close(); // closing previous token websockt connection before starting new one
    }
    },[selectedItem]);

    /*
    *@param event- onChangeEvent called upon selecting different values from the dropdown
    */
    const onSelectNewToken=(event)=>{
        const selectedIndex = tokens.findIndex((token)=>{
          return token.name=== event.target.value
      });
    
      setSelectedItem(tokens[selectedIndex]);
      setCalculatedNumber(0.00);
      setWantedToInvestAmount(0.00);
      };

    return (
        <div>
            <form onSubmit={(event)=>{event.preventDefault();}}>
              <fieldset>
                  <legend><img src={selectedItem.imgaddress} alt="logo" className='token'/></legend>
                    <h2 id="currentText">Current Value</h2> 
                    <span className='currentValue'>₹ {currentValue}</span>
                    <select onChange={onSelectNewToken}>
                       {tokens.map((token)=>
                         <option active="true" key ={token.key} value={token.name}>
                         {token.name}
                        </option>
                        )}
                    </select>
                    <h3>Amount You Want To Invest</h3>
                    <input type="text" className='investbox' value={wantedToInvestAmount} onChange={calculateUnit}/>
                   <h3>Estimate Number of {selectedItem.name} You Will Get </h3>
                   <input type="number" className='getInbox' value={calculatednumber} readOnly={true} />
                   <button className='BuyButton'key ="Buy" onClick={()=>{alert("Buy Button Clicked")}}>Buy</button>
                </fieldset>
            </form>
        </div>
    );
}

export default MainForm;