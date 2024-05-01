package help.desk.helpdesk.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import help.desk.helpdesk.models.Usuario.UsuarioModelDTO;
import help.desk.helpdesk.repositories.UsuarioRepository;

@RestController
@RequestMapping("usuario")
public class UsuarioController {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/getall")
    public ResponseEntity getAllUsers(){
        List<UsuarioModelDTO> lista = this.usuarioRepository.findAll().stream().map(UsuarioModelDTO::new).toList();
        return ResponseEntity.ok(lista);
    }
}
