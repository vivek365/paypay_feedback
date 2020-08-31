package com.paypay.service;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.paypay.entities.User;
import com.paypay.repository.UserRepository;

@Service
@Transactional(readOnly = true)
public class UserService {

	private String token;

	@Autowired
	UserRepository repository;

	public User findByEmailAndPassword(String email, String password) {
		return repository.findByEmailAndPassword(email, password);
	}

	public List<User> findAll() {
		return repository.findAllByIsAdmin(0);
	}

	@Transactional
	public User saveOrUpdate(User user) {
		return repository.save(user);
	}

	public User findById(Long id) {
		return repository.findById(id).orElse(null);
	}

	@Transactional
	public void delete(Long id) {
		repository.deleteById(id);
	}

	public String token() {
		int leftLimit = 48; // numeral '0'
		int rightLimit = 122; // letter 'z'
		int targetStringLength = 20;
		Random random = new Random();

		token = random.ints(leftLimit, rightLimit + 1).filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
				.limit(targetStringLength)
				.collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append).toString();

		return token;
	}

	public Boolean isAlreadyExist(String type, String string) {
		User user = null;
		switch (type) {
		case "email":
			user = repository.findByEmail(string);
			break;
		case "empId":
			user = repository.findByEmpId(string);
			break;
		}
		return user != null ? true : false;
	}

	public List<User> findAllForAssign(Long id, String search) {
		return repository.findAllForAssign(id, search);
	}
}