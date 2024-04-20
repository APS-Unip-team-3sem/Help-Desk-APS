package help.desk.helpdesk.dtos;

import help.desk.helpdesk.auth.TipoUsuario;

public record RegisterDTO(String nome, String senha, TipoUsuario tipo) {
    
}
