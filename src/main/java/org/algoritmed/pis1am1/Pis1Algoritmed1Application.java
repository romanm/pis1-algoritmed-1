package org.algoritmed.pis1am1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportResource;

@SpringBootApplication
@ImportResource("classpath:config-app-spring.xml")
public class Pis1Algoritmed1Application {

	public static void main(String[] args) {
		SpringApplication.run(Pis1Algoritmed1Application.class, args);
	}
}
