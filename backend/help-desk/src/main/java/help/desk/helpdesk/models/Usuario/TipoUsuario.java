package help.desk.helpdesk.models.Usuario;

public enum TipoUsuario {
    USER("user"),
    ADMIN("admin");

    private String tipoUsuario;

    TipoUsuario(String tipo){
        this.tipoUsuario = tipo;
    }

    public String getTipo(){
        return tipoUsuario;
    }
}
