package help.desk.helpdesk.models.Usuario;

public record UsuarioModelDTO(long id, String nome) {
    public UsuarioModelDTO(UsuarioModel usuarioModel){
        this(usuarioModel.getId(), usuarioModel.getNome());
    }
}
