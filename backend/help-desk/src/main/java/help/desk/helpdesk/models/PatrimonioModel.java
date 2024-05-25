package help.desk.helpdesk.models;

import java.io.Serializable;
import java.util.Optional;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
@Getter
@Entity
@Table(name = "Patrimonio")
public class PatrimonioModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private UUID idPatrimonio;
    private String nome_descricao;
    private String CNPJ;
    private String nomeUsuario;

    private String logradouro;
    private String cep;
    private String num;


    public UUID getIdPatrimonio() {
        return idPatrimonio;
    }
    public void setIdPatrimonio(UUID idPatrimonio) {
        this.idPatrimonio = idPatrimonio;
    }
    public String getNome_descricao() {
        return nome_descricao;
    }
    public void setNome_descricao(String nome_descricao) {
        this.nome_descricao = nome_descricao;
    }

    public PatrimonioModel(){}

    public PatrimonioModel(Optional<PatrimonioModel> patrimonioModel){
        patrimonioModel.map(pat -> {
            this.idPatrimonio = pat.idPatrimonio;
            this.nomeUsuario = pat.nomeUsuario;
            this.nome_descricao = pat.nome_descricao;
            this.CNPJ = pat.CNPJ;
            return null;
        });
    }

    public PatrimonioModel(UUID id, String usuarioNome,String nomeDesc, String CNPJ){
        this.idPatrimonio = id;
        this.nome_descricao = nomeDesc;
        this.nomeUsuario = usuarioNome;
        this.CNPJ = CNPJ;

    }
}