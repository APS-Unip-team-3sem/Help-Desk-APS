package help.desk.helpdesk.dtos;

import java.util.UUID;

import help.desk.helpdesk.models.PatrimonioModel;
import help.desk.helpdesk.models.Chamado.ChamadoModel;
import help.desk.helpdesk.models.Chamado.PrioridadeChamado;
import help.desk.helpdesk.models.Usuario.UsuarioModel;

public record ChamadoDto(UUID id, String titulo, String descricao,PrioridadeChamado prioridade, UsuarioModel usuarioModel, PatrimonioModel patrimonioModel){
    public ChamadoDto(ChamadoModel chamado){
        this(chamado.getId(),chamado.getTitulo(),chamado.getDescricao(),chamado.getPrioridadeChamado(),chamado.getUsuarioModel(), chamado.getPatrimonioModel());
    }
    
}
