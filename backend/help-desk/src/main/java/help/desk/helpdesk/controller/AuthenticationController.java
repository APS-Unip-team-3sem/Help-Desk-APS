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
import help.desk.helpdesk.models.PatrimonioModel;
import help.desk.helpdesk.models.PessoaModel;
import help.desk.helpdesk.models.Usuario.AuthenticationDTO;
import help.desk.helpdesk.models.Usuario.LoginRespondeDTO;
import help.desk.helpdesk.models.Usuario.RegisterDTO;
import help.desk.helpdesk.models.Usuario.TipoUsuario;
import help.desk.helpdesk.models.Usuario.UsuarioModel;
import help.desk.helpdesk.repositories.PatrimonioRepository;
import help.desk.helpdesk.repositories.PessoaRepository;
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

    @Autowired
    private PatrimonioRepository patrimonioRepository;

    @Autowired
    private PessoaRepository pessoaRepository;

    public AuthenticationController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Validated AuthenticationDTO data) {
        if (data.nome() == null || data.senha() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nome ou Senha está nulo");
        }
        try {
            
            UsernamePasswordAuthenticationToken usernamePassword = new UsernamePasswordAuthenticationToken(data.nome(),
            data.senha());
            var auth = this.authenticationManager.authenticate(usernamePassword);
            
            var token = tokenService.generateToken((UsuarioModel) auth.getPrincipal());
            return ResponseEntity.ok(new LoginRespondeDTO(token));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Login ou Senha incorretos");
        } 
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Validated RegisterDTO data) {
        if (this.usuarioRepository.findByNomeIgnoreCase(data.nome()) != null) {
            return ResponseEntity.badRequest().body("Usuário ja existe no sistema");
        }
        try {
            if (data.nome().matches("^[a-zA-Z]*$")) {
                if (data.nome().length() <= 5) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nome muito curto!");
                }

                if (data.senha().length() <= 5) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Senha muito curta!");
                }

                String encryptedSenha = new BCryptPasswordEncoder().encode(data.senha());

                UsuarioModel usuarioModel = new UsuarioModel(data.nome(), encryptedSenha, data.tipo());

                this.usuarioRepository.save(usuarioModel);

                UsuarioModel usuarioModel1 = (UsuarioModel) usuarioRepository.findByNomeIgnoreCase(data.nome());
                if (data.tipo() == TipoUsuario.USER){
                    PatrimonioModel patrimonio = new PatrimonioModel(usuarioModel1.getId(), usuarioModel1.getNome(),data.nomeInteiro(), data.cadastro());
                    this.patrimonioRepository.save(patrimonio);
                } else if(data.tipo() == TipoUsuario.ADMIN){
                    PessoaModel pessoaModel = new PessoaModel(usuarioModel1.getId(), usuarioModel1.getNome(),data.nomeInteiro(), data.cadastro());
                    pessoaRepository.save(pessoaModel);
                }
                return ResponseEntity.ok().build();
            }
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nome, Senha ou tipo está nulo");
        } catch (Exception c) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(c.getMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                "Não foi possivel, verifique os dados que estão sendo enviados. Usuário não pode possuir numeros nem caracteres especiais");
    }
}
