package help.desk.helpdesk.models.Usuario;

import java.util.UUID;

public record UsuarioModelDTO(UUID id, String nome) {
    public UsuarioModelDTO(UsuarioModel usuarioModel){
        this(usuarioModel.getId(), usuarioModel.getNome());
    }

}
