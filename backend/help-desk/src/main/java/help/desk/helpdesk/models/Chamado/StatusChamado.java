package help.desk.helpdesk.models.Chamado;

public enum StatusChamado {
    ABERTO("Aberto"),
    ANDAMENTO("Em andamento"),
    FECHADO("Fechado");

    private String status;

    private StatusChamado(String status){
        this.status = status;
    }

    public String getStatus(){
        return status;
    }
}
