package org.algoritmed.pis1am1.controllers;

import java.util.Map;

import org.algoritmed.pis1am1.components.ReadJsonFromFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class CommonRest {
	private static final Logger logger = LoggerFactory.getLogger(CommonRest.class);
	@Autowired	ReadJsonFromFile readJsonFromFile;
	@GetMapping("/v/{page1}")
	public String viewPage1(@PathVariable String page1, Model model) {
		logger.info(" \n\n--20-- --viewPage1-- /v/{page1} "+page1);
		Map<String, Object> configWebSite = readJsonFromFile.readConfigWebSite();
		Map<String, Object> pageConfig = (Map<String, Object>) configWebSite.get(page1);
		if(pageConfig==null)
			return "redirect:/";
		for (String key : pageConfig.keySet()) {
			Object value = pageConfig.get(key);
			model.addAttribute(key, value);
		}
		String th_template = (String) model.asMap().get("th_template");
		System.err.println("--28-- --viewPage1-- /v/{page1} "+page1+" th_template = "+th_template);
		
		return th_template;
	}
}
