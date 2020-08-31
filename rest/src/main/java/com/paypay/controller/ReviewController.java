package com.paypay.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.paypay.entities.Review;
import com.paypay.service.ReviewService;

@RestController
@RequestMapping("review")
public class ReviewController {

	@Autowired
	ReviewService service;

	@PostMapping()
	public Review create(@RequestBody Review review) {
		return service.saveOrUpdate(review);
	}

	@PostMapping("/saveAll")
	public boolean createAll(@RequestBody Map<String, Object> map) {
		return service.assignEmployeeForReview(map);
	}

	@PutMapping()
	public Review update(@RequestBody Review review) {
		return service.saveOrUpdate(review);
	}

	@GetMapping("/{id}")
	public Review findById(@PathVariable(value = "id") Long id) {
		return service.findById(id);
	}

	@GetMapping()
	public List<Review> findAll() {
		return service.findAll();
	}

	@GetMapping("/reviews/{id}")
	public List<Review> findAllByReviewerId(@PathVariable(value = "id") Long id) {
		return service.findAllByReviewerId(id);
	}

	@GetMapping("/employee/{id}/reviews")
	public List<Review> findAllByEmployeeId(@PathVariable(value = "id") Long id) {
		return service.findAllByEmployeeId(id);
	}

	@DeleteMapping("/{id}")
	public void update(@PathVariable(value = "id") Long id) {
		service.delete(id);
	}
}
