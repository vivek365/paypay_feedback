package com.paypay.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "review")
public class Review {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "emp_id")
	private User employee;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "reviewer_id")
	private User reviewer;
	
	private String reviewDate;
	private Byte reviewerRating;
	private Byte activeStatus;
	private String comment;

}
