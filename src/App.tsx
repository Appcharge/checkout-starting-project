import React, {useState} from 'react';
import bundle1 from './assets/bundle1.svg';
import './style.scss';
import {AppchargeCheckout} from "appcharge-checkout-reactjs-sdk";
import {Box, Button, Modal, TextField} from "@mui/material";

function App() {
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [token, setToken] = useState('');
    const [domain, setDomain] = useState('');

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const data = {
        customer: {
            id: "Appcharge",
            email: "fe@appcharge.com",
        },
        priceDetails: {
            "price": 20000,
            "currency": "USD"
        },
        offer: {
            "name": "bundle-one",
            "sku": "bundle-1",
            "assetUrl": "https://png.pngtree.com/png-vector/20220612/ourmid/pngtree-golden-coin-game-ui-icon-png-image_5030176.png",
        },
        items: [
            {
                name: "Coins",
                assetUrl:
                    "https://media-dev.appcharge.com/media/product-3.png",
                sku: "coins-01",
                quantity: 6580,
            },
            {
                name: "Tokens",
                assetUrl: "https://media-dev.appcharge.com/media/bills.png",
                sku: "tokens-01",
                quantity: 150,
            },
            {
                name: "Boosters",
                assetUrl: "https://media-dev.appcharge.com/media/booster.png",
                sku: "boosters-01",
                quantity: 3,
            },
        ]
    };
    const onClickToPurchase = () => {
        setIsModalOpen(true);
    }

    const applyClicked = () => {
        setIsCheckoutOpen(true);
    }

    return (
        <div className="gamestore">
            <h1 className={"store-title"}>Sample Store</h1>
            <div className={"bundles_container"}>
                <div className={"bundle"} onClick={onClickToPurchase}>
                    <img src={bundle1} alt={""}/>
                </div>
                <div className={"bundle"} onClick={onClickToPurchase}>
                    <img src={bundle1} alt={""}/>
                </div>
            </div>

            {isModalOpen && (
                <Modal
                    open={true}
                    onClose={() => console.log}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}
                         className={"modal"}>
                        <TextField id="outlined-basic" label="Domain" variant="outlined" value={domain}
                                   onChange={(e) => setDomain(e.target.value)}/>
                        <TextField id="outlined-basic" label="Session Token" variant="outlined" value={token}
                                   onChange={(e) => setToken(e.target.value)}/>
                        <Box sx={{marginLeft: 'auto', paddingTop: '10px'}}><Button variant={'contained'}
                                                                                   onClick={applyClicked}>Apply</Button></Box>
                    </Box>
                </Modal>
            )}

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
