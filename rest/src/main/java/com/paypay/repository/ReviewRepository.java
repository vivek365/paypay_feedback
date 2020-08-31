package com.paypay.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.paypay.entities.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

	List<Review> findAllByReviewerId(Long id);

	List<Review> findAllByEmployeeId(Long id);

}