package help.desk.helpdesk.models.Chamado;

public enum PrioridadeChamado {
    INDEFINIDO("Indefinido"),
    ALTA("Alta"),
    MEDIA("Media"),
    BAIXA("Baixa");

    private String prioridade;

    private PrioridadeChamado(String prioridade){
        this.prioridade = prioridade;
    }

    public String getPrioridade(){
        return prioridade;
    }
    
}
