const limitFloatLength = num => parseFloat(num.toFixed(2))

const getCartItemSummary = (cart = {}, products = []) => {
  const cartItems = []

  if (cart && cart.items) {
    cart.items.forEach(item => {
      const product = products.find(product => product._id.equals(item._id))

      if (product) {
        cartItems.push({
          _id: product._id,
          name: product.name,
          price: product.price,
          images: product.images,
          quantity: item.quantity || 0
        })
      }
    })
  }

  const cartPrice = cartItems ? cartItems.reduce((price, item) => price + limitFloatLength(item.price * item.quantity), 0) : 0
  return {
    items: cartItems,
    price: cartPrice,
    totalPrice: limitFloatLength(cartPrice * 1.07)
  }
}

module.exports = getCartItemSummary
