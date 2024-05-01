package help.desk.helpdesk.auth.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;

import help.desk.helpdesk.models.Usuario.UsuarioModel;

@Service
public class TokenService {
    @Value("${api.security.token.secret}")
    private String secret;// = "my-secret-key";

    public String generateToken(UsuarioModel usuarioModel) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(this.secret);
            
            String token = JWT.create()
                    .withIssuer("auth-api")
                    .withSubject(usuarioModel.getNome())
                    .withClaim("id",usuarioModel.getId())
                    .withClaim("nome",usuarioModel.getNome())
                    .withClaim("tipo",String.valueOf(usuarioModel.getTipousuario()))
                    .withExpiresAt(this.genExpDate())
                    .sign(algorithm);
            return token;
        } catch (JWTCreationException e) {
            e.printStackTrace();
            throw new RuntimeException("Error while generating token", e);
        }
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(this.secret);
            return JWT.require(algorithm)
                    .withIssuer("auth-api")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException e) {
            e.printStackTrace();
            return "";
        }
    }

    private Instant genExpDate() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }

}
