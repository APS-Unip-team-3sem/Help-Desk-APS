package help.desk.helpdesk.auth;

public enum TipoUsuario {
    USER("user"),
    ADMIN("admin");

    private String tipo;

    TipoUsuario(String tipo){
        this.tipo = tipo;
    }

    public String getTipo(){
        return tipo;
    }
}
