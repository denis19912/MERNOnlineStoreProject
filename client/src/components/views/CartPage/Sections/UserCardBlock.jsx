import React from 'react'

function UserCardBlock(props) {
    console.log(props.products);

    const renderCartImage = (images) => {
        if (images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`;
        }
    }
    const renderItems = () => (
        props.products && props.products.map(product => (
            <tr key={product._id}>
                <td>
                    <img src={renderCartImage(product.images)} alt="Product" style={{ width: '7rem' }} />
                </td>
                <td>{product.quantity}EA</td>
                <td>{product.price}€</td>
                <td><button onClick>Remove</button></td>
            </tr>
        ))
    );
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Remove from Cart</th>
                    </tr>
                </thead>
                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock
