package com.backend.productImg;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProdImgRepository extends JpaRepository<ProductImg,Integer> {

    @Query(value="select * from tb_prod_image where prod_num = :prodNum and prod_image_type = :prodImageType limit 1",
            nativeQuery=true)
    ProductImg findTopByProdNumAndProdImageType(Integer prodNum, Integer prodImageType);

    //이미지 여러장 받을때 사용
    @Query(value="select * from tb_prod_image where prod_num = :prodNum and prod_image_type = :prodImageType",
            nativeQuery=true)
   List<ProductImg> findAllByProdNumAndProdImageType(Integer prodNum, Integer prodImageType);
}


