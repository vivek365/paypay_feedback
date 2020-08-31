package com.paypay.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.paypay.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	User findByEmailAndPassword(String email, String password);

	List<User> findAllByIsAdmin(Integer i);

	User findByEmail(String email);

	User findByEmpId(String empId);

	@Query("from User where id not in (select reviewer.id from Review where employee.id = :id) and isAdmin = 0 and id <> :id and (email like concat('%', :search, '%') or empId like concat('%', :search, '%') or name like concat('%', :search, '%'))")
	List<User> findAllForAssign(@Param("id") Long id, @Param("search") String search);

}