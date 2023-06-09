package com.backend.product.controller;

import com.backend.product.dto.ProductResponse;
import com.backend.product.service.ProductServiceImpl;
import com.backend.product.entity.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping
@RestController
@RequiredArgsConstructor
public class ProductController {
    private final ProductServiceImpl productServiceImpl;

    @PostMapping("/prodDetail")
    public void create(@RequestBody Product product) {
        productServiceImpl.create(product);
    }

    @GetMapping("/proddetail/{prod_num}")
    public ProductResponse.ProductDetailDto getProductDetail(@PathVariable("prod_num") Integer prodNum) {
        return productServiceImpl.getProductDetail(prodNum);
    }

    @GetMapping("/listscent")
    public List<ProductResponse.ProductListDto> getCategory(@RequestParam("category") String category) {
        return productServiceImpl.getListByCategory(category);
    }
}
