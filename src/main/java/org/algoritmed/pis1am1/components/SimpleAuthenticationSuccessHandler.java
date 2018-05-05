package org.algoritmed.pis1am1.components;

import java.io.IOException;
import java.util.Collection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class SimpleAuthenticationSuccessHandler 
implements AuthenticationSuccessHandler, LogoutSuccessHandler{

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
			throws IOException, ServletException {
		String pageKey = (String) request.getSession().getAttribute("pageKey");
		String redirectUrl = "/";
		if(pageKey!=null&&!pageKey.equals(""))
			redirectUrl = "/v/"+pageKey;
		System.err.println("--19-- redirectUrl--"+redirectUrl);
		boolean checkRole = checkRole(authentication,"ROLE_PATIENT");
		if(!checkRole) {
			System.err.println("illegal login: "+authentication.getName());
		}
		redirectStrategy.sendRedirect(request, response, redirectUrl);
	}

	private boolean checkRole(Authentication arg2, String myRole) {
		for (GrantedAuthority grantedAuthority : arg2.getAuthorities())
			if(grantedAuthority.getAuthority().equals(myRole))
				return true;
		return false;
	}

	@Override
	public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication arg2)
			throws IOException, ServletException {
		String redirectUrl = "/v/login1";
		System.err.println("--40-- redirectUrl--"+redirectUrl);
		redirectStrategy.sendRedirect(request, response, redirectUrl);
		
	}
	private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
	//	http://www.devglan.com/spring-security/spring-boot-security-redirect-after-login
}
