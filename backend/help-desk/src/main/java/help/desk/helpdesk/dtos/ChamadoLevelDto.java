package help.desk.helpdesk.dtos;
import help.desk.helpdesk.models.Usuario.TipoUsuario;
import help.desk.helpdesk.models.Usuario.UsuarioModel;
import java.util.Date;
import java.util.UUID;
public record ChamadoLevelDto(UUID id ,UsuarioModel usuarioModel,String observacao, TipoUsuario tipoUsuario, Date data){
    
}
