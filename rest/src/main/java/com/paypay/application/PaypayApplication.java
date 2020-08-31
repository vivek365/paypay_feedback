package com.paypay.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan({"com.paypay.*"})
@EntityScan("com.paypay.entities")
@EnableJpaRepositories("com.paypay.repository")
public class PaypayApplication {

	public static void main(String[] args) {
		SpringApplication.run(PaypayApplication.class, args);
	}

}
