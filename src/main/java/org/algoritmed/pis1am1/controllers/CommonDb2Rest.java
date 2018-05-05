package org.algoritmed.pis1am1.controllers;

import java.security.Principal;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.algoritmed.pis1am1.db.Db2Common;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CommonDb2Rest  extends Db2Common{
	@GetMapping("/r/read2_sql_with_param")
	public @ResponseBody Map<String, Object> read2_sql_with_param(
			@RequestParam(value = "sql", required = true) String sql
			,HttpServletRequest request
			) {
		Map<String, Object> map = sqlParamToMap(sql, request);
		logger.info("\n\n--24-- --begin-- /read2_sql_with_param"
				+ "\n" + map
				);
		read_select(map, env.getProperty(sql), db2ParamJdbcTemplate);
		logger.info("\n--28-- --end-- /read2_sql_with_param \n"
				);
		return map;
	}
	@PostMapping("/r/update2_sql_with_param")
	public @ResponseBody Map<String, Object> update_sql_with_param(
//			@RequestParam(value = "sql", required = true) String sql,
			@RequestBody Map<String, Object> data
			,HttpServletRequest request
			,Principal principal
		) {
		String sql = (String) data.get("sql");
		logger.info("\n\n-- 29 -- /r/update2_sql_with_param \n"
				+ sql
				+ "\n"
				+ data
				);
		executeSqlBlock.update_sql_script(data, sql, env);
		return data;
	}
}
