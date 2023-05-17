package com.backend.cart;

import com.backend.productOption.ProductOption;

import java.util.List;

public interface CartService {

    public void addCart(AddCartDto cartDTO);

    public List<Cart> listCart();

    public void deleteCart(ProductOption productOption);
}
