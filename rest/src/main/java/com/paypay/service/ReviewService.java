package com.paypay.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.paypay.entities.Review;
import com.paypay.entities.User;
import com.paypay.repository.ReviewRepository;

@Service
@Transactional(readOnly = true)
public class ReviewService {

	@Autowired
	ReviewRepository repository;

	public List<Review> findAll() {
		return repository.findAll();
	}

	@Transactional
	public Review saveOrUpdate(Review review) {
		return repository.save(review);
	}

	public Review findById(Long id) {
		return repository.findById(id).orElse(null);
	}

	@Transactional
	public void delete(Long id) {
		repository.deleteById(id);
	}

	public List<Review> findAllByReviewerId(Long id) {
		return repository.findAllByReviewerId(id);
	}

	@SuppressWarnings("unchecked")
	@Transactional
	public boolean assignEmployeeForReview(Map<String, Object> map) {
		if (map != null) {
			List<Integer> userList = (List<Integer>) map.get("selectedReviewers");
			Long empId = Long.parseLong(map.get("empId").toString());
			if (userList != null) {
				for (Integer u : userList) {
					Review r = new Review();
					r.setEmployee(new User(empId));
					r.setActiveStatus((byte) 1);
					r.setReviewer(new User(Long.valueOf(u)));
					r.setReviewerRating((byte) 0);
					repository.save(r);
				}
				return true;
			} else {
				return true;
			}

		} else {
			return true;
		}
	}

	public List<Review> findAllByEmployeeId(Long id) {
		return repository.findAllByEmployeeId(id);
	}

}