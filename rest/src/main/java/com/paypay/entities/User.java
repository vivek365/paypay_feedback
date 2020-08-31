package com.paypay.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@JsonIgnore
	@Column(updatable = false)
	private String password;
	private String empId;
	private String name;
	private String gender;
	private String email;
	private String mobile;
	private String birthDate;
	private String joiningDate;
	private String address;
	private String type;
	private Byte activeStatus;

	@Column(insertable = false, updatable = false)
	private Integer isAdmin;

	@Transient
	private String token;

	public User(Long id) {
		this.id = id;
	}

}
