import React from 'react';
import "./TopNavigation.css";

/*
*This is TopNavigation component
* return all the links of the topnavbar
*/
function TopNavigation() {
    return (
        <div className='MyNav'>
            <img src="https://cardstarter.io/assets/img/upcoming/neofiLogo.png" key ="logo" alt="logo" className='myLogo'/>
            <div  className='myLinks'>
                <a href="trade"id ="trade" key ="TradeLink" onClick={(event)=>{event.preventDefault();}}>Trade</a>
                <a href="earn" key="EarnLink" onClick={(event)=>{event.preventDefault();}}>Earn</a>
                <a href="support" key="SupportLink" onClick={(event)=>{event.preventDefault();}}>Support</a>
                <a href="about" key ="AboutLink" onClick={(event)=>{event.preventDefault();}}>About</a>
            </div>
            <button className='NavButton' key="connect" onClick={()=>{alert("Connect wallet Clicked")}}>Connect Wallet</button>
        </div>
    );
}

export default TopNavigation;