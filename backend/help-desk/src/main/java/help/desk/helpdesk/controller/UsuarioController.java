package help.desk.helpdesk.controller;

import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import help.desk.helpdesk.models.Usuario.UsuarioModel;
import help.desk.helpdesk.models.Usuario.UsuarioModelDTO;
import help.desk.helpdesk.repositories.UsuarioRepository;
import jakarta.validation.Valid;

@RestController
@RequestMapping("usuario")
public class UsuarioController {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/getall")
    private ResponseEntity<?> getAllUsers(){
        List<UsuarioModelDTO> lista = this.usuarioRepository.findAll().stream().map(UsuarioModelDTO::new).toList();
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/{nome}")
    private ResponseEntity<?> getByName(@PathVariable("nome") @Valid String nome){
        try {
            UsuarioModelDTO user = this.usuarioRepository.getIdByNomeIgnoreCase(nome);
            return ResponseEntity.ok(user.id());
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi possivel encontrar o usuário: " + nome);
        }
    } 

    @GetMapping("g/{id}")
    private ResponseEntity<?> getById(@PathVariable("id") @Valid UUID id){
        UsuarioModel usu = new UsuarioModel(usuarioRepository.findById(id));
        
        return ResponseEntity.ok(new UsuarioModelDTO(id,usu.getNome(),usu.getTipousuario()));
    }
}
