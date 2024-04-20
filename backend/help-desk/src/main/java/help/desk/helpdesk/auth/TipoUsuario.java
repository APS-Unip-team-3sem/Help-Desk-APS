package help.desk.helpdesk.auth;

public enum TipoUsuario {
    USUARIO("usuario"),
    TECNICO("tecnico");

    private String tipo;

    TipoUsuario(String tipo){
        this.tipo = tipo;
    }

    public String getTipo(){
        return tipo;
    }
}
