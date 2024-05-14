package help.desk.helpdesk.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import help.desk.helpdesk.dtos.ChamadoDto;
import help.desk.helpdesk.models.Chamado.ChamadoModel;
import help.desk.helpdesk.models.Chamado.PrioridadeChamado;
import help.desk.helpdesk.models.Chamado.StatusChamado;
import help.desk.helpdesk.models.Usuario.TipoUsuario;
import help.desk.helpdesk.models.Usuario.UsuarioModel;

import help.desk.helpdesk.repositories.ChamadoRepository;
import jakarta.validation.Valid;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("chamado")
public class ChamadoController {

    @Autowired
    private ChamadoRepository chamadoRepository;

    @GetMapping("/getall")
    private ResponseEntity<?> getAllChamados() {
        List<ChamadoDto> lista = chamadoRepository.findAll().stream().map(ChamadoDto::new).toList();
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/get/{id}")
    private ResponseEntity<?> getChamado(@PathVariable("id") @Valid UUID id) {
        Optional<ChamadoModel> chamado = chamadoRepository.findById(id);
        return (chamado.isPresent()) ? ResponseEntity.ok(chamado)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body("Chamado inexistente ou inacessível");
    }

    @PutMapping("/put/{id}")
    private ResponseEntity<?> putChamado(@RequestBody ChamadoDto newChamado, @PathVariable("id") @Valid UUID id) {
        Authentication authenticantion = SecurityContextHolder.getContext().getAuthentication();
        UsuarioModel usuariomodel = ((UsuarioModel) authenticantion.getPrincipal());

        Optional<ChamadoModel> chamado = chamadoRepository.findById(id);
        ChamadoModel chamadoModel = new ChamadoModel(chamado);

        if ((usuariomodel.getTipousuario() == TipoUsuario.ADMIN ||
                chamadoModel.getUsuarioModel().getId() == usuariomodel.getId()) &&
                chamadoModel.getStatusChamado() == StatusChamado.ABERTO) {

            if (chamado.isPresent()) {
                chamadoModel.setTitulo(newChamado.titulo());
                chamadoModel.setDescricao(newChamado.descricao());
                chamadoModel.setPrioridadeChamado(newChamado.prioridade());
                chamadoRepository.save(chamadoModel);
                return ResponseEntity.ok().body("Chamado atualizado com sucesso!");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Chamado inexistente ou inacessível");
    }

    @DeleteMapping("/del/{id}")
    private ResponseEntity<?> delChamado(@PathVariable("id") @Valid UUID id) {
        Optional<ChamadoModel> chamado = chamadoRepository.findById(id);
        if (chamado.isPresent()) {
            chamadoRepository.deleteById(id);
            return ResponseEntity.ok().body("Chamado deletado com sucesso");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Chamado inexistente ou inacessível");
        }
    }

    @PostMapping("/add")
    private ResponseEntity<?> addChamado(@RequestBody @Valid ChamadoDto chamadoDto) {
        try {
            Authentication authenticantion = SecurityContextHolder.getContext().getAuthentication();
            UsuarioModel usuariomodel = ((UsuarioModel) authenticantion.getPrincipal());

            ChamadoModel chamadoModel = new ChamadoModel(chamadoDto.titulo(), chamadoDto.descricao(),
                    chamadoDto.prioridade(), Date.from(LocalDateTime.now().toInstant(ZoneOffset.UTC)), usuariomodel,
                    chamadoDto.patrimonioModel());
            return ResponseEntity.ok(chamadoRepository.save(chamadoModel));
        } catch (Exception e) {

            return ResponseEntity.ok(e.getMessage());
        }
    }

    @PutMapping("/end/{id}")
    private ResponseEntity<?> closeChamado(@PathVariable("id") @Valid UUID id) {
        Authentication authenticantion = SecurityContextHolder.getContext().getAuthentication();
        UsuarioModel usuariomodel = ((UsuarioModel) authenticantion.getPrincipal());

        Optional<ChamadoModel> chamado = chamadoRepository.findById(id);
        ChamadoModel chamadoModel = new ChamadoModel(chamado);

        if (chamado.isPresent()) {
            if (chamadoModel.getStatusChamado() == StatusChamado.FECHADO) {
                return ResponseEntity.status(HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS).body("Chamado já está fechado");

            } else if (chamadoModel.getUsuarioModelResponsavel().getId() == usuariomodel.getId()) {
                chamadoModel.setStatusChamado(StatusChamado.FECHADO);
                chamadoModel.setFechamento(Date.from(LocalDateTime.now().toInstant(ZoneOffset.UTC)));
                chamadoRepository.save(chamadoModel);
                return ResponseEntity.status(HttpStatus.OK).body("Chamado finalizado com sucesso!");
            } else {
                return ResponseEntity.status(HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS)
                        .body("Chamado pode ser fechado apenas pelo seu responsável");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Chamado inexistente ou inacessível");
    }

    @PutMapping("/init/{id}")
    private ResponseEntity<?> initChamado(@PathVariable("id") @Valid UUID id) {
        Authentication authenticantion = SecurityContextHolder.getContext().getAuthentication();
        UsuarioModel usuariomodel = ((UsuarioModel) authenticantion.getPrincipal());

        Optional<ChamadoModel> chamado = chamadoRepository.findById(id);
        ChamadoModel chamadoModel = new ChamadoModel(chamado);

        if (chamado.isPresent()) {
            if (chamadoModel.getStatusChamado() == StatusChamado.FECHADO) {
                return ResponseEntity.status(HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS).body("Chamado ja foi fechado");

            } else if (chamadoModel.getStatusChamado() == StatusChamado.ANDAMENTO
                    && chamadoModel.getUsuarioModelResponsavel().getId() == usuariomodel.getId()) {
                return ResponseEntity.status(HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS).body("Chamado ja iniciado");

            } else if (chamadoModel.getStatusChamado() == StatusChamado.ANDAMENTO) {
                return ResponseEntity.status(HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS)
                        .body("Chamado ja iniciado por outro responsável");
            } else {
                chamadoModel.setStatusChamado(StatusChamado.ANDAMENTO);
                chamadoModel.setUsuarioModelResponsavel(usuariomodel);
                chamadoRepository.save(chamadoModel);
                return ResponseEntity.status(HttpStatus.OK).body("Chamado atribuido com sucesso!");
            }

        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Chamado inexistente ou inacessível");
    }

    @GetMapping("/getby/{mod}")
    private ResponseEntity<?> getBy(@PathVariable("mod") @Valid String mod) {
        Authentication authenticantion = SecurityContextHolder.getContext().getAuthentication();
        UsuarioModel usuLog = ((UsuarioModel) authenticantion.getPrincipal());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd"); 
        Optional<ChamadoModel> chamadoOPT = null;
        List<ChamadoDto> listaDTO = chamadoRepository.findAll().stream().map(ChamadoDto::new).toList();
        List<ChamadoModel> listaMODEL = new ArrayList<>();
        //mod = mod.toLowerCase();

        if(mod.isBlank()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Não foi especificado o que buscar");
        }

        for (ChamadoDto chamado : listaDTO) {
            chamadoOPT = null;
            chamadoOPT = chamadoRepository.findById(chamado.id());
            if (mod.equals("user")) {
                if (chamadoOPT.isPresent()) {
                    chamadoOPT.map(chamadoFinal -> {
                        try {
                            if (chamadoFinal.getUsuarioModel().getId() == usuLog.getId()) {
                                listaMODEL.add(chamadoFinal);
                            }
                        } catch (NullPointerException e) {
                        }
                        return null;
                    });
                }
            } else if (mod.contains("user-")) {
                long parmId = Long.parseLong(mod.substring(5, mod.length()));
                if (chamadoOPT.isPresent()) {
                    chamadoOPT.map(chamadoFinal -> {
                        try {
                            if (chamadoFinal.getUsuarioModel().getId() == parmId) {
                                listaMODEL.add(chamadoFinal);
                            }
                        } catch (NullPointerException e) {
                        }
                        return null;
                    });
                }
            } else if (mod.equalsIgnoreCase("userr")) {
                if (chamadoOPT.isPresent()) {
                    chamadoOPT.map(chamadoFinal -> {
                        try {
                            if (chamadoFinal.getUsuarioModelResponsavel().getId() == usuLog.getId()) {
                                listaMODEL.add(chamadoFinal);
                            }
                        } catch (NullPointerException e) {}
                        return null;
                    });
                }
            } else if (mod.contains("userr-")){
                long parmId = Long.parseLong(mod.substring(6, mod.length()));
                if (chamadoOPT.isPresent()){
                    chamadoOPT.map(chamadoFinal -> {
                        try{
                            if(chamadoFinal.getUsuarioModelResponsavel().getId() == parmId){
                                listaMODEL.add(chamadoFinal);
                            }
                        }catch(NullPointerException e){}
                        return null;
                    });
                }   
            } else if (mod.contains("prio-")){
                String prio = mod.substring(5,mod.length());
                if (chamadoOPT.isPresent()){
                    chamadoOPT.map(chamadoFinal -> {
                        try {
                            if(chamadoFinal.getPrioridadeChamado() == PrioridadeChamado.valueOf(prio)){
                                listaMODEL.add(chamadoFinal);
                            }
                        } catch (NullPointerException e) {}
                        return null;
                    });
                }
            } else if (mod.contains("date-")){
                String dates = mod.substring(6,mod.length()); // '2024-05-14_2024-07-16'
                try {
                    Date date1 = simpleDateFormat.parse(dates.substring(0,10));
                    Date date2 = simpleDateFormat.parse(dates.substring(11,dates.length()));
                    if(chamadoOPT.isPresent()){
                        chamadoOPT.map(chamadoFinal -> {
                            if(chamadoFinal.getAbertura().after(date1) && chamadoFinal.getAbertura().before(date2)){
                                listaMODEL.add(chamadoFinal);
                            }
                            return null;
                        });
                    }
                } catch (ParseException e){} catch (NullPointerException c){}

            }
        }
        return ResponseEntity.ok(listaMODEL);

    }

}
