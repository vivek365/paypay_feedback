package com.paypay.controller;

import java.util.Base64;
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

import com.paypay.entities.User;
import com.paypay.service.UserService;

@RestController
@RequestMapping("user")
public class UserController {

	private String defaultPassword = "MTIzNDU2";

	@Autowired
	UserService service;

	@PostMapping("/login")
	public User login(@RequestBody Map<String, String> map) {

		User user = service.findByEmailAndPassword(map.get("email").toString(), Base64.getEncoder().encodeToString(map.get("password").toString().getBytes()));
		if (user != null && user.getId() != null) {
			user.setPassword(null);
			user.setToken(service.token());
			return user;
		}

		return null;
	}

	@PostMapping()
	public User create(@RequestBody User user) {
		if (user.getId() == null) {
			user.setPassword(defaultPassword);
		}
		return service.saveOrUpdate(user);
	}

	@PutMapping()
	public User update(@RequestBody User user) {
		return service.saveOrUpdate(user);
	}

	@GetMapping("/{id}")
	public User findById(@PathVariable(value = "id") Long id) {
		return service.findById(id);
	}

	@GetMapping()
	public List<User> findAll() {
		return service.findAll();
	}

	@DeleteMapping("/{id}")
	public void update(@PathVariable(value = "id") Long id) {
		service.delete(id);
	}

	@GetMapping("/{type}/isAlreadyExist/{string}")
	public Boolean verifyExistance(@PathVariable("type") String type, @PathVariable("string") String string) {
		return service.isAlreadyExist(type, string);
	}
	
	@GetMapping("{id}/assignee/{search}")
	public List<User> findAllForAssign(@PathVariable("id") Long id, @PathVariable("search") String search) {
		return service.findAllForAssign(id, search);
	}
}
