package com.example.prj;

import com.example.prj.entity.User;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.example.prj.entity")
public class PrjApplication {
	public static void main(String[] args) {
		SpringApplication.run(PrjApplication.class, args);
	}
}
