import React from "react";
import "./discounted_product_amounts.css";

const productContext = React.createContext({name: "Product 1", amount: 4000, discount: "20%" });

function DiscountedProductAmounts() {
    return (
        <div>
            <productContext.Provider value={{ name: "Product 1", amount: 4000, discount: "20%" }}>
                <div className="productDetails">
                    <div>
                        <ProductAmount />
                    </div>
                    <div>
                        <ProductDiscount />
                    </div>
                </div>
                <div className="productTotal">
                    <ProductTotal />
                </div>
            </productContext.Provider>
            <productContext.Provider value={{ name: "Product 2", amount: 2500, discount: "30%" }}>
                <div className="productDetails">
                    <div>
                        <ProductAmount />
                    </div>
                    <div>
                        <ProductDiscount />
                    </div>
                </div>
                <div className="productTotal">
                    <ProductTotal />
                </div>
            </productContext.Provider>
            <productContext.Provider value={{ name: "Product 3", amount: 7655, discount: "13%" }}>
                <div className="productDetails">
                    <div>
                        <ProductAmount />
                    </div>
                    <div>
                        <ProductDiscount />
                    </div>
                </div>
                <div className="productTotal">
                    <ProductTotal />
                </div>
            </productContext.Provider>
        </div>
    );
}

function ProductAmount() {
    return (
        <div className="productAmount">
            <productContext.Consumer>
                {(product) => (
                    <div>
                        <p>
                            <span className="label">Amount</span>
                            <span className="value amount">${product.amount.toFixed(2)}</span>
                        </p>
                    </div>
                )}
            </productContext.Consumer>
        </div>
    );
}

function ProductDiscount() {
    return (
        <div className="productDiscount">
            <productContext.Consumer>
                {(product) => (
                    <div>
                        <p>
                            <span className="label">Discount</span>
                            <span className="value discount">{product.discount}</span>
                        </p>
                    </div>
                )}
            </productContext.Consumer>
        </div>
    );
}

function ProductTotal() {
    return (
        <div className="productTotal">
            <productContext.Consumer>
                {(product) => {
                    const discountAmount = product.amount * (parseFloat(product.discount) / 100);
                    const totalAmount = product.amount - discountAmount;
                    return (
                        <div>
                            <p>
                                <span className="label">Product</span>
                                <span className="value">{product.name}</span>
                            </p>
                            <p>
                                <span className="label">Actual Amount</span>
                                <span className="value actual">${product.amount.toFixed(2)}</span>
                            </p>
                            <p>
                                <span className="label">Discount Amount</span>
                                <span className="value discount">${discountAmount.toFixed(2)}</span>
                            </p>
                            <p>
                                <span className="label">Total Amount</span>
                                <span className="value total">${totalAmount.toFixed(2)}</span>
                            </p>
                        </div>
                    );
                }}
            </productContext.Consumer>
        </div>
    );
}

export default DiscountedProductAmounts;
