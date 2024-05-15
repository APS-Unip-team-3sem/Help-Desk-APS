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

    @GetMapping("")
    private ResponseEntity<?> getAllChamados() {
        List<ChamadoModel> lista = chamadoRepository.findAll().stream().map(ChamadoModel::new).toList();
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/{id}")
    private ResponseEntity<?> getChamado(@PathVariable("id") @Valid UUID id) {
        Optional<ChamadoModel> chamado = chamadoRepository.findById(id);
        return (chamado.isPresent()) ? ResponseEntity.ok(chamado)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body("Chamado inexistente ou inacessível");
    }

    @GetMapping("/{tag}/{value}/{mod}")
    private ResponseEntity<?> getBy(@PathVariable("tag") @Valid String tag, @PathVariable("value") @Valid String value,
            @PathVariable("mod") @Valid String mod) {
        Authentication authenticantion = SecurityContextHolder.getContext().getAuthentication();
        UsuarioModel usuarioLogado = ((UsuarioModel) authenticantion.getPrincipal());

        if (mod.isBlank()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi especificado o que buscar");
        }

        List<ChamadoDto> listaDTO = chamadoRepository.findAll().stream().map(ChamadoDto::new).toList();
        List<ChamadoModel> listaMODEL = new ArrayList<>();

        for (ChamadoDto chamado : listaDTO) {
            Optional<ChamadoModel> chamadoOPT = chamadoRepository.findById(chamado.id());
            if (chamadoOPT.isPresent()) {
                try {
                    chamadoOPT.map(chamadoFinal -> {

                        if (tag.equalsIgnoreCase("user") && value.equalsIgnoreCase("null") && mod.equals("null")) {
                            if (chamadoFinal.getUsuarioModel().getId() == usuarioLogado.getId()) {
                                listaMODEL.add(chamadoFinal);
                            }
                        } else if (tag.equalsIgnoreCase("user") && mod.equalsIgnoreCase("null")) {
                            if (chamadoFinal.getUsuarioModel().getId() == Long.parseLong(value)) {
                                listaMODEL.add(chamadoFinal);
                            }
                        } else if (tag.equalsIgnoreCase("tech") && value.equalsIgnoreCase("null")
                                && mod.equalsIgnoreCase("null")) {

                            if (chamadoFinal.getUsuarioModelResponsavel().getId() == usuarioLogado.getId()) {
                                listaMODEL.add(chamadoFinal);
                            }
                        } else if (tag.equalsIgnoreCase("tech") && mod.equalsIgnoreCase("null")) {
                            if (chamadoFinal.getUsuarioModelResponsavel().getId() == Long.parseLong(value)) {
                                listaMODEL.add(chamadoFinal);
                            }
                        } else if (tag.equalsIgnoreCase("prior") && mod.equalsIgnoreCase("null")) {
                            try {
                                if (chamadoFinal.getPrioridadeChamado() == PrioridadeChamado
                                        .valueOf(value.toUpperCase())) {
                                    listaMODEL.add(chamadoFinal);
                                }
                            } catch (IllegalArgumentException e) {
                            }
                        } else if (tag.equalsIgnoreCase("dates") && mod.equalsIgnoreCase("null")) {
                            String[] dates = value.split("[_]");
                            try {
                                Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(dates[0]);
                                Date date2 = new SimpleDateFormat("yyyy-MM-dd").parse(dates[1]);
                                if (chamadoFinal.getAbertura().after(date1)
                                        && chamadoFinal.getAbertura().before(date2)) {
                                    listaMODEL.add(chamadoFinal);

                                }
                            } catch (ParseException p) {
                            }
                        } else if (tag.equalsIgnoreCase("date") && mod.equalsIgnoreCase("past")) {
                            try {
                                Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(value);
                                if (chamadoFinal.getAbertura().before(date1)) {
                                    listaMODEL.add(chamadoFinal);
                                }
                            } catch (ParseException e) {
                            }
                        } else if (tag.equalsIgnoreCase("date") && mod.equalsIgnoreCase("future")) {
                            try {
                                Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(value);
                                if (chamadoFinal.getAbertura().after(date1)) {
                                    listaMODEL.add(chamadoFinal);
                                }
                            } catch (ParseException e) {
                            }
                        }
                        return null;
                    });
                } catch (NullPointerException n) {
                }
            }

        }

        return ResponseEntity.ok(listaMODEL);
    }

    @PutMapping("/{id}")
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

    @PutMapping("/e/{id}")
    private ResponseEntity<?> closeChamado(@PathVariable("id") @Valid UUID id) {
        Authentication authenticantion = SecurityContextHolder.getContext().getAuthentication();
        UsuarioModel usuariomodel = ((UsuarioModel) authenticantion.getPrincipal());

        Optional<ChamadoModel> chamado = chamadoRepository.findById(id);
        ChamadoModel chamadoModel = new ChamadoModel(chamado);
        try {

            if (chamado.isPresent()) {
                if (chamadoModel.getStatusChamado() == StatusChamado.FECHADO) {
                    return ResponseEntity.status(HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS)
                            .body("Chamado já está fechado");

                } else if (chamadoModel.getUsuarioModelResponsavel().getId() == usuariomodel.getId()) {
                    chamadoModel.setStatusChamado(StatusChamado.FECHADO);
                    chamadoModel.setFechamento(Date.from(LocalDateTime.now().toInstant(ZoneOffset.UTC)));
                    chamadoRepository.save(chamadoModel);
                    return ResponseEntity.status(HttpStatus.OK).body("Chamado finalizado com sucesso!");

                }
            }
        } catch (NullPointerException e) {

            return ResponseEntity.status(HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS)
                    .body("Chamado pode ser fechado apenas pelo seu responsável");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Chamado inexistente ou inacessível");
    }

    @PutMapping("/i/{id}")
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

    @DeleteMapping("/{id}")
    private ResponseEntity<?> delChamado(@PathVariable("id") @Valid UUID id) {

        Optional<ChamadoModel> chamado = chamadoRepository.findById(id);
        if (chamado.isPresent()) {
            chamadoRepository.deleteById(id);
            return ResponseEntity.ok().body("Chamado deletado com sucesso");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Chamado inexistente ou inacessível");
        }
    }

    @PostMapping("")
    private ResponseEntity<?> addChamado(@RequestBody @Valid ChamadoDto chamadoDto) {
        Authentication authenticantion = SecurityContextHolder.getContext().getAuthentication();
        UsuarioModel usuarioLogado = ((UsuarioModel) authenticantion.getPrincipal());
        try {

            ChamadoModel chamadoModel = new ChamadoModel(chamadoDto.titulo(), chamadoDto.descricao(),
                    chamadoDto.prioridade(), Date.from(LocalDateTime.now().toInstant(ZoneOffset.UTC)), usuarioLogado,
                    chamadoDto.patrimonioModel());
            return ResponseEntity.ok(chamadoRepository.save(chamadoModel));
        } catch (Exception e) {

            return ResponseEntity.ok(e.getMessage());
        }
    }

}
