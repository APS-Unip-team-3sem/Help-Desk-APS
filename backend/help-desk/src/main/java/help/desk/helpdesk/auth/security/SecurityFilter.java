package help.desk.helpdesk.auth.security;

import java.io.IOException;
import java.util.Collection;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import help.desk.helpdesk.repositories.UsuarioRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.var;

@Component
public class SecurityFilter extends OncePerRequestFilter {

        @Autowired
        TokenService tokenService;

        @Autowired
        UsuarioRepository usuarioRepository;

        @Override
        protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                        FilterChain filterChain)
                        throws ServletException, IOException {
                String token = this.recoverToken(request);

                if (token != null) {
                        String nome = tokenService.validateToken(token);
                        UserDetails userDetails = usuarioRepository.findByNome(nome);

                        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null,
                                        userDetails.getAuthorities());
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                }
                filterChain.doFilter(request, response);
        }

        private String recoverToken(HttpServletRequest request) {
                String authHeader = request.getHeader("Authorization");
                if (authHeader != null) {
                        return authHeader.replace("Bearer ", "");
                }
                return null;
        }
}