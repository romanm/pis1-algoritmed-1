package org.algoritmed.pis1am1.controllers;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import org.algoritmed.pis1am1.db.Db2Common;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class PrincipalRest extends Db2Common {
	private static final Logger logger = LoggerFactory.getLogger(PrincipalRest.class);
	@GetMapping("/r/principal")
	public @ResponseBody Map<String, Object> principal(Principal principal) {
		Map<String, Object> map = 
				principal2(principal);
		return map;
	}
	private Map<String, Object> principal2(Principal principal) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("principal", principal);
		if(null!=principal) {
			String name = principal.getName();
			map.put("username", name);
			Map<String, Object> user = db2ParamJdbcTemplate.queryForMap(env.getProperty("sql2.users.fromUsername"), map);
			user.remove("password");
			map.put("user", user);
		}

		return map;
	}
}
