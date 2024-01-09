import React, {useState} from 'react';
import bundle1 from './assets/bundle1.svg';
import './style.scss';
import axios from "axios";
import {AppchargeCheckout} from "appcharge-checkout-reactjs-sdk";

const CHECKOUT_TOKEN = '25d9f232107fbf7f2d15666fdbf06fa7ac4f7eac16c3262a65ed1a15a98f3e35';

function App() {
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [token, setToken] = useState('');
    const [domain, setDomain] = useState('');

    const data = {
        customer: {
            id: "John Doe",
            email: "guy@appcharge.com",
        },
        priceDetails: {
            "price": 20000,
            "currency": "USD"
        },
        offer: {
            "name": "bundle-one",
            "sku": "123456",
            "assetUrl": "https://png.pngtree.com/png-vector/20220612/ourmid/pngtree-golden-coin-game-ui-icon-png-image_5030176.png",
        },
        items: [
            {
                name: "Coins",
                assetUrl:
                    "https://media-dev.appcharge.com/media/product-3.png",
                sku: "coins_xoxoxo",
                quantity: 6580,
            },
            {
                name: "Tokens",
                assetUrl: "https://media-dev.appcharge.com/media/bills.png",
                sku: "coins_xoxoxo",
                quantity: 150,
            },
            {
                name: "Boosters",
                assetUrl: "https://media-dev.appcharge.com/media/booster.png",
                sku: "coins_xoxoxo",
                quantity: 3,
            },
        ]
    };

    const headers = {
        headers: {
            "x-publisher-token": CHECKOUT_TOKEN
        }
    }
    const onClickToPurchase = () => {
        axios.post('https://a3no38e5c1.execute-api.us-east-1.amazonaws.com/sandbox/createSession', data, headers)
            .catch((err) => console.log(err))
            .then((res) => {
                if (!res) return;
                setToken(res.data.checkoutSessionToken)
                setDomain(res.data.url)
                setIsCheckoutOpen(true);
            });
    }

    return (
        <div className="gamestore">
            <h1 className={"store-title"}>Rony's Store</h1>
            <div className={"bundles_container"}>
                <div className={"bundle"} onClick={onClickToPurchase}>
                    <img src={bundle1} alt={""}/>
                </div>
                <div className={"bundle"} onClick={onClickToPurchase}>
                    <img src={bundle1} alt={""}/>
                </div>
            </div>

            {isCheckoutOpen && (
                <AppchargeCheckout domain={domain} sessionToken={token}
                                   onClose={() => setIsCheckoutOpen(false)}
                                   onOpen={() => console.log("open")}
                                   onInitialLoad={() => console.log("on initial load")}
                                   onOrderCreated={() => console.log("on order created")}
                                   onPaymentIntentFailed={() => console.log("on payment intended")}
                                   onOrderCompletedFailed={() => console.log("on order completed intended")}
                                   onPaymentIntentSuccess={() => console.log("on payment intent success")}
                                   referrerUrl={window.location.protocol + "//" + window.location.host}/>)
            }
        </div>
    );
}

export default App;
