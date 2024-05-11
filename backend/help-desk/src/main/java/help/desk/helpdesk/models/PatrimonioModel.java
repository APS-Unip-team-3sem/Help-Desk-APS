package help.desk.helpdesk.models;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Patrimonio")
public class PatrimonioModel implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO) //gerar id automaticamente
	private UUID idPatrimonio; //ids distribuidos
	private String nome_descricao;
	private String numero_serie;
	private Date data_aquisicao;
	private String localizacao;
	private BigDecimal valor;
	
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
	public String getNumero_serie() {
		return numero_serie;
	}
	public void setNumero_serie(String numero_serie) {
		this.numero_serie = numero_serie;
	}
	public Date getData_aquisicao() {
		return data_aquisicao;
	}
	public void setData_aquisicao(Date data_aquisicao) {
		this.data_aquisicao = data_aquisicao;
	}
	public String getLocalizacao() {
		return localizacao;
	}
	public void setLocalizacao(String localizacao) {
		this.localizacao = localizacao;
	}
	public BigDecimal getValor() {
		return valor;
	}
	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}
	
	
}
