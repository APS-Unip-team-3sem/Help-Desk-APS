package help.desk.helpdesk.controller;

import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import help.desk.helpdesk.dtos.ChamadoLevelDto;
import help.desk.helpdesk.models.Chamado.ChamadoModel;
import help.desk.helpdesk.models.Chamado.ChamadoModelLevel;
import help.desk.helpdesk.models.Usuario.UsuarioModel;
import help.desk.helpdesk.repositories.ChamadoLevelRepository;
import help.desk.helpdesk.repositories.ChamadoRepository;
import jakarta.validation.Valid;
import java.util.Optional;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

@RestController
@RequestMapping("clevel")
public class ChamadoLevelController {
    
    @Autowired
    private ChamadoLevelRepository chamadoLevelRepository;

    @Autowired
    private ChamadoRepository chamadoRepository;

    @GetMapping("all/{id}")
    private ResponseEntity<?> findAll(@PathVariable("id") @Valid UUID id){
        return ResponseEntity.ok(chamadoLevelRepository.findByIdOrderBySequenciaAsc(id));
    }

    @PostMapping("")
    private ResponseEntity<?> add(@RequestBody ChamadoLevelDto chamadoDTO){
        Authentication authenticantion = SecurityContextHolder.getContext().getAuthentication();
        UsuarioModel usuarioLogado = ((UsuarioModel) authenticantion.getPrincipal());
        try {
            
            Optional<ChamadoModelLevel> last = findLast(chamadoDTO.id());
            ChamadoModelLevel add = new ChamadoModelLevel();
            Optional<ChamadoModel> chamadoPai = chamadoRepository.findById(chamadoDTO.id());
            if(chamadoPai.isPresent()){

                add.setId(chamadoDTO.id());
                add.setData(Date.from(LocalDateTime.now().toInstant(ZoneOffset.UTC)));
                add.setUsuarioModel(usuarioLogado);
                add.setTipousuario(usuarioLogado.getTipousuario());
                add.setId(chamadoDTO.id());
                add.setObservacao(chamadoDTO.observacao());
                if(last.isPresent()){
                    last.map(las ->{
                        
                        add.setSequencia(las.getSequencia()+1);
                        return null;
                    });
                }
                chamadoLevelRepository.save(add);
            } else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("POST ChamadoLevel - Chamado inexistente ou inacessível");
            }
            } catch (NullPointerException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("POST ChamadoLevel - ChamadoLevel inexistente ou inacessível");
            }
            
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Sucesso!");
    }

    private Optional<ChamadoModelLevel> findLast(UUID id){
        return chamadoLevelRepository.findFirstByIdOrderBySequenciaDesc(id);
    }
}
