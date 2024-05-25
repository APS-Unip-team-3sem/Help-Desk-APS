package help.desk.helpdesk.models.Usuario;

import java.util.UUID;

public record UsuarioModelDTO(UUID id, String nome,TipoUsuario tipousuario) {
    public UsuarioModelDTO(UsuarioModel usuarioModel){
        this(usuarioModel.getId(), usuarioModel.getNome(),usuarioModel.getTipousuario());
    }

}
