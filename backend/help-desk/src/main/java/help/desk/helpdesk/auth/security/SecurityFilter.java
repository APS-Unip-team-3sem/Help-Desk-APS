package help.desk.helpdesk.auth.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import help.desk.helpdesk.repositories.UsuarioRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SecurityFilter extends OncePerRequestFilter {

        @Autowired
        TokenService tokenService;

        @Autowired
        UsuarioRepository usuarioRepository;

        @SuppressWarnings("null")
        @Override
        protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
                throws ServletException, IOException {
                        String token = this.recoverToken(request);
                        
                        if(token != null){
                                String nome = tokenService.validateToken(token);
                                UserDetails userDetails = usuarioRepository.findByNomeIgnoreCase(nome);

                                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null,userDetails.getAuthorities());
                                SecurityContextHolder.getContext().setAuthentication(authentication);
                        }
                        filterChain.doFilter(request, response);
                }

        private String recoverToken(HttpServletRequest request){
                String authHeader = request.getHeader("Authorization");
                if(authHeader != null){
                return authHeader.replace("Bearer ","");
                } 
                return null;
        }
}