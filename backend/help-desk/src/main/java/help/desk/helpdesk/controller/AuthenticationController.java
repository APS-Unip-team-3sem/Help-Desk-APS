package help.desk.helpdesk.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import help.desk.helpdesk.auth.security.TokenService;
import help.desk.helpdesk.models.Usuario.AuthenticationDTO;
import help.desk.helpdesk.models.Usuario.LoginRespondeDTO;
import help.desk.helpdesk.models.Usuario.RegisterDTO;
import help.desk.helpdesk.models.Usuario.UsuarioModel;
import help.desk.helpdesk.repositories.UsuarioRepository;

@RestController
@RequestMapping("auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TokenService tokenService;

    public AuthenticationController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Validated AuthenticationDTO data) {
        if (data.nome() == null || data.senha() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nome ou Senha está nulo");
        }

        UsernamePasswordAuthenticationToken usernamePassword = new UsernamePasswordAuthenticationToken(data.nome(),
                data.senha());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((UsuarioModel) auth.getPrincipal());
        return ResponseEntity.ok(new LoginRespondeDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Validated RegisterDTO data) {
        if (this.usuarioRepository.findByNome(data.nome()) != null) {
            return ResponseEntity.badRequest().build();
        }

        try {
            if (data.nome().length() <= 5) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nome muito curto!");
            }

            if (data.senha().length() <= 5) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Senha muito curta!");
            }

        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nome, Senha ou tipo está nulo");
        }

        String encryptedSenha = new BCryptPasswordEncoder().encode(data.senha());

        UsuarioModel usuarioModel = new UsuarioModel(data.nome(), encryptedSenha, data.tipo());

        this.usuarioRepository.save(usuarioModel);
        return ResponseEntity.ok().build();
    }
}
