package com.backend.member.repository;

import com.backend.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findById(String id);

    Optional<Member> deleteById(String id);

    boolean existsById(String id);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    Optional<Member> findByNameAndPhone(String name, String phone);

    Optional<Member> findByNameAndIdAndPhone(String name, String id, String phone);

    Optional<Member> findEmailByPhone(String phone);
}
