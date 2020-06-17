import React, { useState } from "react";

export const priceContext = React.createContext();
export const pickupdateContext = React.createContext("");
export const returndateContext = React.createContext("");
export const dropoffdateContext = React.createContext("");
export const boxContext = React.createContext();
export const regularPriceF = React.createContext();
export const carrierPriceF = React.createContext();
export const paymentInfoContext = React.createContext();
// new states for sample
export const boxTypeContext = React.createContext();
export const fromAddressContext = React.createContext();
export const QuotationContext = React.createContext();
export const AuthContext = React.createContext();
const Store = ({ children }) => {
  // new stuff starts
  const [activeStep, setActiveStep] = useState(0);
  const [fromAddress, setFromAddress] = useState({});
  const [boxTypeToSend, setBoxTypeToSend] = useState("");
  const [auth, setAuth] = useState({ role: "", token: "100" });
  // new stuff ends
  const [price, setPrice] = useState({});
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [box, setBox] = useState({ b: 0, p: 0 });
  const [regularPrice, SetRegularPrice] = useState([]);
  const [carrierPrice, SetCarrierPrice] = useState([]);
  const [payInfo, setPayInfo] = useState({
    nameKorean: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    password: ""
  });

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      <QuotationContext.Provider value={[activeStep, setActiveStep]}>
        <fromAddressContext.Provider value={[fromAddress, setFromAddress]}>
          <boxTypeContext.Provider value={[boxTypeToSend, setBoxTypeToSend]}>
            <paymentInfoContext.Provider value={[payInfo, setPayInfo]}>
              <regularPriceF.Provider value={[regularPrice, SetRegularPrice]}>
                <carrierPriceF.Provider value={[carrierPrice, SetCarrierPrice]}>
                  <boxContext.Provider value={[box, setBox]}>
                    <dropoffdateContext.Provider
                      value={[dropoffDate, setDropoffDate]}
                    >
                      <returndateContext.Provider
                        value={[returnDate, setReturnDate]}
                      >
                        <pickupdateContext.Provider
                          value={[pickupDate, setPickupDate]}
                        >
                          <priceContext.Provider value={[price, setPrice]}>
                            {children}
                          </priceContext.Provider>
                        </pickupdateContext.Provider>
                      </returndateContext.Provider>
                    </dropoffdateContext.Provider>
                  </boxContext.Provider>
                </carrierPriceF.Provider>
              </regularPriceF.Provider>
            </paymentInfoContext.Provider>
          </boxTypeContext.Provider>
        </fromAddressContext.Provider>
      </QuotationContext.Provider>
    </AuthContext.Provider>
  );
};

export default Store;
