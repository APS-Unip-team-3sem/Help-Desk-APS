package help.desk.helpdesk.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import help.desk.helpdesk.models.UsuarioModel;
import help.desk.helpdesk.repositories.UsuarioRepository;

@RestController
@RequestMapping("usuario")
public class UsuarioController {
    
    private UsuarioRepository usuarioRepository;

    @GetMapping("/getall")
    public List<UsuarioModel> getAllUsers(){
        return usuarioRepository.findAll();
    }
}
