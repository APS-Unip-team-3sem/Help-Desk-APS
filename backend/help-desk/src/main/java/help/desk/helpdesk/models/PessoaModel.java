package help.desk.helpdesk.models;

import java.io.Serializable;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Entity
@Table(name = "Pessoa")
public class PessoaModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private UUID idPessoa;
    private String nome;
    private String nomeInteiro;
    private String cpf;

    public PessoaModel(UUID id, String nome, String nomeInteiro ,String cpf){
        this.idPessoa = id;
        this.nome = nome;
        this.nomeInteiro = nomeInteiro;
        this.cpf = cpf;
    }
    public PessoaModel(){
    }
}