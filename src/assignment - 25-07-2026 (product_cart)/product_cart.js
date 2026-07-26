import React from "react";
import './product_cart.css';

class ProductCart extends React.Component {
    constructor() {
        super();
        const iphone17_white = { productId: 2, productName: "Iphone 17", price: 80000, color: "White", stockStatus: "Out of Stock", availableQuantity: 0, };
        const iphone17_purple = { productId: 3, productName: "Iphone 17", price: 81000, color: "Purple", stockStatus: "Out of Stock", availableQuantity: 0, };
        const iphone18_white = { productId: 5, productName: "Iphone 18", price: 91000, color: "White", stockStatus: "Out of Stock", availableQuantity: 0, };
        const iphone18_purple = { productId: 6, productName: "Iphone 18", price: 92000, color: "Purple", stockStatus: "Out of Stock", availableQuantity: 0, }

        this.state = { products: [iphone17_white, iphone17_purple, iphone18_white, iphone18_purple], purchasedProducts: [], totalPurchasedProducts: 0, totalAmount: 0, discount: 0, finalAmount: 0 };
    }

    componentDidMount() {
        const updatedProducts = this.state.products.map(product => {
            return { ...product, availableQuantity: 3, stockStatus: "In Stock" };
        });
        this.setState({ products: updatedProducts });
    }

    addToCart(productId) {
        const product = this.state.products.find(p => p.productId === productId);
        if (product && product.availableQuantity > 0) {
            const updatedProducts = this.state.products.map(p => {
                if (p.productId === productId) {
                    return { ...p, availableQuantity: p.availableQuantity - 1, stockStatus: p.availableQuantity - 1 > 0 ? "In Stock" : "Out of Stock" };
                }
                return p;
            }
            );
            const purchasedProduct = { productId: product.productId, productName: product.productName, price: product.price, color: product.color };
            const totalPurchasedProducts = this.state.totalPurchasedProducts + 1;
            const totalAmount = this.state.totalAmount + product.price;
            let discount = 0;
            if (totalPurchasedProducts > 2) {
                discount = totalAmount * 0.1; // 10% discount
            }
            const finalAmount = totalAmount - discount;
            this.setState({ products: updatedProducts, purchasedProducts: [...this.state.purchasedProducts, purchasedProduct], totalPurchasedProducts, totalAmount, discount, finalAmount });
        }
    }

    removeFromCart(productId) {
        const product = this.state.purchasedProducts.find(p => p.productId === productId);
        if (product) {
            const updatedProducts = this.state.products.map(p => {
                if (p.productId === productId) {
                    return { ...p, availableQuantity: p.availableQuantity + 1, stockStatus: "In Stock" };
                }
                return p;
            });
            const updatedPurchasedProducts = this.state.purchasedProducts.filter(p => p.productId !== productId);
            const totalPurchasedProducts = this.state.totalPurchasedProducts - 1;
            const totalAmount = this.state.totalAmount - product.price;
            let discount = 0;
            if (totalPurchasedProducts > 2) {
                discount = totalAmount * 0.1; // 10% discount
            }
            const finalAmount = totalAmount - discount;
            this.setState({ products: updatedProducts, purchasedProducts: updatedPurchasedProducts, totalPurchasedProducts, totalAmount, discount, finalAmount });
        }
    }

    render() {

        return (
            <div className="product-cart">
                <h1>Product Cart</h1>
                <div className="products-list">
                    {Object.values(this.state.products).map((product, index) => (
                        <div key={index} className="product">
                            <div className="product-row">
                                <div className="product-left">
                                    <h2>{product.productName}</h2>
                                    <p><b>Available Quantity:</b> {product.availableQuantity}</p>
                                </div>


                                <div className="product-right">
                                    <p className="price">₹{product.price.toLocaleString()}</p>
                                    <p className="color">
                                        <span className="color-dot" style={{ backgroundColor: product.color.toLowerCase() }}></span>
                                        {product.color}
                                    </p>
                                </div>
                            </div>
                            <div className="product-row">
                                <div className="product-left">
                                    <button className="add-to-cart" disabled={product.stockStatus !== 'In Stock'} onClick={() => this.addToCart(product.productId)}>
                                        Add to Cart
                                    </button>
                                    <div className="product-right">
                                        <span className={`stock ${product.stockStatus === 'In Stock' ? 'in' : 'out'}`}>
                                            {product.stockStatus}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <h3>Purchased Products</h3>
                <div className="purchased-products">
                    <table className="purchased-products-table">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Product Name</th>
                                <th>Color</th>
                                <th>Price</th>
                                <th> Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.purchasedProducts.map((product, index) => (
                                <tr key={index} className="purchased-prodcut-details">
                                    <td>{index + 1}</td>
                                    <td>{product.productName}</td>
                                    <td>{product.color}</td>
                                    <td style={{ fontWeight: '700',textAlign: 'right' }}>₹{product.price.toLocaleString()}</td>
                                    <td>
                                        <button className="remove-from-cart" onClick={() => this.removeFromCart(product.productId)}>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="3"><b>Total Amount: </b></td>
                                <td style={{ fontWeight: '700',textAlign: 'right' }}>₹{this.state.totalAmount.toLocaleString()}</td>
                                <td></td>
                            </tr>
                            
                        </tfoot>
                    </table>
                </div>

                <div className="amount-summary">
                    <div className="amount-summary-row">
                        <div className="amount-summary-left">
                            <p><b>Discount:</b></p>
                        </div>
                        <div className="amount-summary-right discount-amount">
                            <p>₹{this.state.discount.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="amount-summary-row">
                        <div className="amount-summary-left">
                            <p><b>Final Amount:</b></p>
                        </div>
                        <div className="amount-summary-right final-amount">
                            <p>₹{this.state.finalAmount.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default ProductCart;