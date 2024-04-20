package help.desk.helpdesk.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import help.desk.helpdesk.dtos.AuthenticationDTO;
import help.desk.helpdesk.dtos.RegisterDTO;
import help.desk.helpdesk.models.UsuarioModel;
import help.desk.helpdesk.repositories.UsuarioRepository;

@RestController
@RequestMapping("auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository usuarioRepository;
/* 
 * 
 @PostMapping("/login")
 public ResponseEntity<Void> login(@RequestBody @Validated AuthenticationDTO data){
     var usernamePassword = new UsernamePasswordAuthenticationToken(data.nome(), data.senha());
     var auth = this.authenticationManager.authenticate(usernamePassword);
     return ResponseEntity.ok().build();
    }
    */

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody @Validated AuthenticationDTO data){
        Authentication authenticationRequest = UsernamePasswordAuthenticationToken.unauthenticated(data.nome(), data.senha());
        Authentication authenticationResponse = this.authenticationManager.authenticate(authenticationRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody @Validated RegisterDTO data ){
        if(this.usuarioRepository.findByNome(data.nome()) != null) return ResponseEntity.badRequest().build();
        String encryptedSenha = new BCryptPasswordEncoder().encode(data.senha());

        UsuarioModel usuarioModel = new UsuarioModel(data.nome(), data.senha(), data.tipo());

        this.usuarioRepository.save(usuarioModel);
        return ResponseEntity.ok().build();
    }
}
